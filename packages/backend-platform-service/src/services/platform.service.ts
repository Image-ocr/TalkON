import { createLogger } from '@talkon/shared';

const logger = createLogger('platform-service');

export class PlatformService {
  async getFeatureFlags(userId: string): Promise<Record<string, boolean>> {
    logger.info(`Getting feature flags for user ${userId}`);
    return {
      'ai-replies': true,
      'video-calls': false,
      'communities': true
    };
  }

  async getRemoteConfig(): Promise<any> {
    return {
      minVersion: '1.0.0',
      maintenanceMode: false
    };
  }
}
