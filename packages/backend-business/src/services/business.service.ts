import { createLogger } from '@talkon/shared';

const logger = createLogger('business-service');

export class BusinessService {
  async getBusinessProfile(businessId: string): Promise<any> {
    logger.info(`Getting business profile for ${businessId}`);
    return {
      id: businessId,
      name: 'Business Name',
      catalog: [],
      analytics: {}
    };
  }

  async updateCatalog(businessId: string, items: any[]): Promise<void> {
    logger.info(`Updating catalog for ${businessId}`);
  }
}
