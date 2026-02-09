import * as admin from 'firebase-admin';
import { createLogger } from '@talkon/shared';
import { INotification } from '@talkon/types';

const logger = createLogger('notification-service');

export class NotificationService {
  private static instance: NotificationService;
  private fcm: admin.messaging.Messaging | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<void> {
    try {
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        this.fcm = admin.messaging();
        logger.info('Firebase Admin initialized');
      } else {
        logger.warn('FIREBASE_SERVICE_ACCOUNT not provided, push notifications will be mocked');
      }
    } catch (error) {
      logger.error('Failed to initialize Firebase Admin', error as Error);
    }
  }

  async sendPushNotification(
    token: string,
    notification: { title: string; body: string; data?: Record<string, string> }
  ): Promise<void> {
    if (this.fcm) {
      try {
        await this.fcm.send({
          token,
          notification: {
            title: notification.title,
            body: notification.body,
          },
          data: notification.data,
          android: {
            priority: 'high',
          },
          apns: {
            payload: {
              aps: {
                contentAvailable: true,
                sound: 'default',
              },
            },
          },
        });
        logger.info(`Push notification sent to token: ${token}`);
      } catch (error) {
        logger.error('Failed to send push notification', error as Error);
      }
    } else {
      logger.info(`[MOCK] Sending push notification to ${token}: ${notification.title}`);
    }
  }

  async sendToUser(
    userId: string,
    notification: { title: string; body: string; data?: Record<string, string> }
  ): Promise<void> {
    // In a real app, you'd fetch the user's device tokens from the database/Redis
    logger.info(`Sending notification to user ${userId}`);
    // This is where you would call sendPushNotification for each device token
  }
}
