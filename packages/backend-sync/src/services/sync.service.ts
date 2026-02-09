import { createLogger } from '@talkon/shared';
import { RedisService } from './redis.service';

const logger = createLogger('sync-service');

export enum SyncEventType {
  MESSAGE_NEW = 'MESSAGE_NEW',
  MESSAGE_UPDATE = 'MESSAGE_UPDATE',
  CONVERSATION_UPDATE = 'CONVERSATION_UPDATE',
  CONTACT_UPDATE = 'CONTACT_UPDATE',
  SETTING_UPDATE = 'SETTING_UPDATE',
}

export interface SyncEvent {
  id: string;
  type: SyncEventType;
  data: any;
  timestamp: Date;
}

export class SyncService {
  private static instance: SyncService;

  private constructor() {}

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  async enqueueEvent(userId: string, deviceId: string, event: Omit<SyncEvent, 'id' | 'timestamp'>): Promise<void> {
    const syncEvent: SyncEvent = {
      id: Math.random().toString(36).substring(7),
      ...event,
      timestamp: new Date(),
    };

    const redis = RedisService.getInstance();
    const key = `sync_queue:${userId}:${deviceId}`;
    await redis.set(key, JSON.stringify(syncEvent)); // Simple implementation
    logger.info(`Enqueued sync event for user ${userId}, device ${deviceId}: ${event.type}`);
  }

  async getEvents(userId: string, deviceId: string, lastEventId?: string): Promise<SyncEvent[]> {
    // In a real app, you'd use a Redis stream or list to store events
    return [];
  }
}
