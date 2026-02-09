import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { validate, phoneNumberSchema, otpSchema } from '@talkon/shared';
import { AuthRequest, authenticate } from '../middleware/auth.middleware';
import { ApiResponse, AuthCredentials, OTPVerification, DeviceRegistration } from '@talkon/types';

const router = Router();
const authService = new AuthService();

router.post('/request-otp', async (req, res: any, next) => {
  try {
    const credentials: AuthCredentials = req.body;
    validate(phoneNumberSchema, credentials.phoneNumber);
    
    await authService.requestOTP(credentials);
    
    res.json({
      success: true,
      data: { message: 'OTP sent successfully' },
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/verify-otp', async (req, res: any, next) => {
  try {
    const { phoneNumber, otp, deviceId, deviceInfo } = req.body;
    
    validate(phoneNumberSchema, phoneNumber);
    validate(otpSchema, otp);

    const verification: OTPVerification = { phoneNumber, otp, deviceId };
    const deviceReg: DeviceRegistration = deviceInfo;

    const tokens = await authService.verifyOTP(verification, deviceReg);
    
    res.json({
      success: true,
      data: tokens,
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res: any, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new Error('Refresh token required');
    }

    const tokens = await authService.refreshToken(refreshToken);
    
    res.json({
      success: true,
      data: tokens,
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const sessionId = req.user!.sessionId;
    await authService.logout(sessionId);
    
    res.json({
      success: true,
      data: { message: 'Logged out successfully' },
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/logout-all', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const userId = req.user!.userId;
    await authService.logoutAll(userId);
    
    res.json({
      success: true,
      data: { message: 'Logged out from all devices' },
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

export { router as authRouter };
