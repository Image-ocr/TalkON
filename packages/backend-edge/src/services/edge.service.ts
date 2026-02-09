import { createLogger } from '@talkon/shared';

const logger = createLogger('edge-service');

export class EdgeService {
  async discoverPeers(userId: string): Promise<string[]> {
    logger.info(`Discovering peers for user ${userId}`);
    return [];
  }

  async createCommunity(name: string, ownerId: string): Promise<any> {
    logger.info(`Creating community: ${name}`);
    return { id: 'comm-1', name, ownerId };
  }
}
