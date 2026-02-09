import { createLogger } from '@talkon/shared';

const logger = createLogger('growth-service');

export class GrowthService {
  async generateReferralLink(userId: string): Promise<string> {
    logger.info(`Generating referral link for user ${userId}`);
    return `https://talkon.app/ref/${userId}`;
  }

  async trackReferral(referredId: string, referrerId: string): Promise<void> {
    logger.info(`User ${referredId} was referred by ${referrerId}`);
  }
}
