export interface AuthCredentials {
  phoneNumber: string;
  countryCode: string;
}

export interface OTPVerification {
  phoneNumber: string;
  otp: string;
  deviceId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface AuthSession {
  id: string;
  userId: string;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenHash: string;
  ipAddress: string;
  userAgent: string;
  lastActivityAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

export interface TokenPayload {
  userId: string;
  deviceId: string;
  sessionId: string;
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
}

export interface OTPRecord {
  phoneNumber: string;
  otp: string;
  otpHash: string;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  verified: boolean;
}

export interface RateLimitRecord {
  key: string;
  count: number;
  resetAt: Date;
}

export interface SecurityEvent {
  id: string;
  userId?: string;
  type: SecurityEventType;
  severity: SecuritySeverity;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export enum SecurityEventType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  OTP_REQUESTED = 'OTP_REQUESTED',
  OTP_VERIFIED = 'OTP_VERIFIED',
  OTP_FAILED = 'OTP_FAILED',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  LOGOUT = 'LOGOUT',
  LOGOUT_ALL = 'LOGOUT_ALL',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export enum SecuritySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
