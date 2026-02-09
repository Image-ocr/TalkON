import { Collection, ObjectId } from 'mongodb';
import { IStatus } from '@talkon/types';
import { createLogger } from '@talkon/shared';
// Assume MongoService is available

const logger = createLogger('status-service');

export class StatusService {
  private static instance: StatusService;
  private collection: any; // Collection<IStatus>

  private constructor() {}

  static getInstance(): StatusService {
    if (!StatusService.instance) {
      StatusService.instance = new StatusService();
    }
    return StatusService.instance;
  }

  async createStatus(userId: string, content: any): Promise<IStatus> {
    const status: any = {
      id: new ObjectId().toString(),
      userId,
      content,
      viewers: [],
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    // await this.collection.insertOne(status);
    logger.info(`Status created for user ${userId}`);
    return status;
  }

  async getFeed(userId: string, contactIds: string[]): Promise<IStatus[]> {
    // In a real app, find statuses from contacts that haven't expired
    return [];
  }

  async viewStatus(statusId: string, userId: string): Promise<void> {
    // Add userId to viewers array if not already there
    logger.info(`User ${userId} viewed status ${statusId}`);
  }
}
