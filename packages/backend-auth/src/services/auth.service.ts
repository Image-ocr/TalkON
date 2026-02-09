import {
  AuthCredentials,
  OTPVerification,
  AuthTokens,
  User,
  Device,
  DeviceRegistration,
} from '@talkon/types';
import {
  generateId,
  generateOTP,
  hashString,
  generateToken,
  verifyToken,
  normalizePhoneNumber,
  addMinutes,
  addDays,
  isExpired,
} from '@talkon/shared';
import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  OTP_EXPIRY_MINUTES,
  OTP_MAX_ATTEMPTS,
  REDIS_OTP_PREFIX,
  REDIS_SESSION_PREFIX,
} from '@talkon/shared';
import {
  InvalidCredentialsError,
  InvalidOTPError,
  OTPExpiredError,
  RateLimitError,
  NotFoundError,
} from '@talkon/shared';
import { DatabaseService } from './database.service';
import { RedisService } from './redis.service';
import { SMSService } from './sms.service';
import { createLogger } from '@talkon/shared';

const logger = createLogger('auth-service');
const db = DatabaseService.getInstance();
const redis = RedisService.getInstance();
const smsService = new SMSService();

export class AuthService {
  async requestOTP(credentials: AuthCredentials): Promise<void> {
    const { phoneNumber, countryCode } = credentials;
    const normalizedPhone = normalizePhoneNumber(phoneNumber, countryCode);
    
    const rateLimitKey = `${REDIS_OTP_PREFIX}ratelimit:${normalizedPhone}`;
    const attempts = await redis.get(rateLimitKey);
    
    if (attempts && parseInt(attempts) >= 5) {
      throw new RateLimitError('Too many OTP requests. Please try again later.');
    }

    const otp = generateOTP();
    const otpHash = hashString(otp);
    const expiresAt = addMinutes(new Date(), OTP_EXPIRY_MINUTES);

    const otpKey = `${REDIS_OTP_PREFIX}${normalizedPhone}`;
    await redis.set(
      otpKey,
      JSON.stringify({
        otp: otpHash,
        attempts: 0,
        expiresAt: expiresAt.toISOString(),
      }),
      OTP_EXPIRY_MINUTES * 60
    );

    await redis.incr(rateLimitKey);
    await redis.expire(rateLimitKey, 3600);

    if (process.env.NODE_ENV === 'development') {
      logger.info('OTP generated', { phoneNumber: normalizedPhone, otp });
    } else {
      await smsService.sendOTP(normalizedPhone, otp);
    }

    logger.info('OTP sent', { phoneNumber: normalizedPhone });
  }

  async verifyOTP(verification: OTPVerification, deviceInfo: DeviceRegistration): Promise<AuthTokens> {
    const { phoneNumber, otp, deviceId } = verification;
    const normalizedPhone = normalizePhoneNumber(phoneNumber, '+1');

    const otpKey = `${REDIS_OTP_PREFIX}${normalizedPhone}`;
    const otpData = await redis.get(otpKey);

    if (!otpData) {
      throw new InvalidOTPError('OTP not found or expired');
    }

    const { otp: storedOtpHash, attempts, expiresAt } = JSON.parse(otpData);

    if (isExpired(new Date(expiresAt))) {
      await redis.del(otpKey);
      throw new OTPExpiredError('OTP has expired');
    }

    if (attempts >= OTP_MAX_ATTEMPTS) {
      await redis.del(otpKey);
      throw new InvalidOTPError('Too many failed attempts');
    }

    const otpHash = hashString(otp);
    if (otpHash !== storedOtpHash) {
      await redis.set(
        otpKey,
        JSON.stringify({ otp: storedOtpHash, attempts: attempts + 1, expiresAt }),
        OTP_EXPIRY_MINUTES * 60
      );
      throw new InvalidOTPError('Invalid OTP');
    }

    await redis.del(otpKey);

    let user = await this.findUserByPhone(normalizedPhone);
    if (!user) {
      user = await this.createUser(normalizedPhone);
    }

    const device = await this.registerDevice(user.id, deviceId, deviceInfo);

    const tokens = await this.generateAuthTokens(user.id, device.id);

    logger.info('User authenticated', { userId: user.id, deviceId: device.id });

    return tokens;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const payload = verifyToken(refreshToken, JWT_REFRESH_SECRET);
    if (!payload || payload.type !== 'refresh') {
      throw new InvalidCredentialsError('Invalid refresh token');
    }

    const sessionKey = `${REDIS_SESSION_PREFIX}${payload.sessionId}`;
    const sessionData = await redis.get(sessionKey);
    
    if (!sessionData) {
      throw new InvalidCredentialsError('Session not found or expired');
    }

    const session = JSON.parse(sessionData);
    const refreshTokenHash = hashString(refreshToken);
    
    if (session.refreshTokenHash !== refreshTokenHash) {
      throw new InvalidCredentialsError('Invalid refresh token');
    }

    return this.generateAuthTokens(payload.userId, payload.deviceId, payload.sessionId);
  }

  async logout(sessionId: string): Promise<void> {
    const sessionKey = `${REDIS_SESSION_PREFIX}${sessionId}`;
    await redis.del(sessionKey);
    logger.info('User logged out', { sessionId });
  }

  async logoutAll(userId: string): Promise<void> {
    const sessions = await db.query<{ id: string }>(
      'SELECT id FROM auth_sessions WHERE user_id = $1 AND expires_at > NOW()',
      [userId]
    );

    for (const session of sessions) {
      await redis.del(`${REDIS_SESSION_PREFIX}${session.id}`);
    }

    await db.query('DELETE FROM auth_sessions WHERE user_id = $1', [userId]);
    logger.info('User logged out from all devices', { userId });
  }

  private async findUserByPhone(phoneNumber: string): Promise<User | null> {
    const users = await db.query<User>(
      'SELECT * FROM users WHERE phone_number = $1',
      [phoneNumber]
    );
    return users[0] || null;
  }

  private async createUser(phoneNumber: string): Promise<User> {
    const userId = generateId();
    const phoneHash = hashString(phoneNumber);
    const displayName = phoneNumber.slice(-4);

    const users = await db.query<User>(
      `INSERT INTO users (id, phone_number, phone_number_hash, display_name, is_online, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [userId, phoneNumber, phoneHash, `User ${displayName}`, false]
    );

    logger.info('User created', { userId });
    return users[0];
  }

  private async registerDevice(
    userId: string,
    deviceId: string,
    deviceInfo: DeviceRegistration
  ): Promise<Device> {
    const existing = await db.query<Device>(
      'SELECT * FROM devices WHERE id = $1 AND user_id = $2',
      [deviceId, userId]
    );

    if (existing.length > 0) {
      const updated = await db.query<Device>(
        `UPDATE devices 
         SET device_name = $1, platform = $2, platform_version = $3, 
             app_version = $4, push_token = $5, last_seen = NOW(), 
             is_active = true, updated_at = NOW()
         WHERE id = $6 AND user_id = $7
         RETURNING *`,
        [
          deviceInfo.deviceName,
          deviceInfo.platform,
          deviceInfo.platformVersion,
          deviceInfo.appVersion,
          deviceInfo.pushToken,
          deviceId,
          userId,
        ]
      );
      return updated[0];
    }

    const devices = await db.query<Device>(
      `INSERT INTO devices (id, user_id, device_name, device_type, platform, 
                           platform_version, app_version, push_token, 
                           last_seen, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), true, NOW(), NOW())
       RETURNING *`,
      [
        deviceId,
        userId,
        deviceInfo.deviceName,
        deviceInfo.deviceType,
        deviceInfo.platform,
        deviceInfo.platformVersion,
        deviceInfo.appVersion,
        deviceInfo.pushToken,
      ]
    );

    return devices[0];
  }

  private async generateAuthTokens(
    userId: string,
    deviceId: string,
    existingSessionId?: string
  ): Promise<AuthTokens> {
    const sessionId = existingSessionId || generateId();

    const accessToken = generateToken(
      { userId, deviceId, sessionId, type: 'access' },
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = generateToken(
      { userId, deviceId, sessionId, type: 'refresh' },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXPIRY
    );

    const refreshTokenHash = hashString(refreshToken);
    const expiresAt = addDays(new Date(), 30);

    const sessionKey = `${REDIS_SESSION_PREFIX}${sessionId}`;
    await redis.set(
      sessionKey,
      JSON.stringify({
        userId,
        deviceId,
        refreshTokenHash,
        expiresAt: expiresAt.toISOString(),
      }),
      30 * 24 * 60 * 60
    );

    await db.query(
      `INSERT INTO auth_sessions (id, user_id, device_id, refresh_token_hash, 
                                  last_activity_at, expires_at, created_at)
       VALUES ($1, $2, $3, $4, NOW(), $5, NOW())
       ON CONFLICT (id) DO UPDATE 
       SET refresh_token_hash = $4, last_activity_at = NOW(), expires_at = $5`,
      [sessionId, userId, deviceId, refreshTokenHash, expiresAt]
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
      tokenType: 'Bearer',
    };
  }
}
