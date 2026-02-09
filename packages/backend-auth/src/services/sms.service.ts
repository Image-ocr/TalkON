import twilio from 'twilio';
import { createLogger } from '@talkon/shared';

const logger = createLogger('sms-service');

export class SMSService {
  private client: twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      logger.warn('Twilio credentials not configured, SMS will not be sent');
      this.client = null as unknown as twilio.Twilio;
    } else {
      this.client = twilio(accountSid, authToken);
    }
  }

  async sendOTP(phoneNumber: string, otp: string): Promise<void> {
    if (!this.client) {
      logger.warn('SMS not sent - Twilio not configured', { phoneNumber, otp });
      return;
    }

    try {
      await this.client.messages.create({
        body: `Your TalkON verification code is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      logger.info('OTP SMS sent', { phoneNumber });
    } catch (error) {
      logger.error('Failed to send SMS', error as Error, { phoneNumber });
      throw error;
    }
  }
}
