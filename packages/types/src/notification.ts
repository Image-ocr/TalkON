export interface Notification {
  id: string;
  userId: string;
  deviceId?: string;
  type: NotificationType;
  title: string;
  body: string;
  data: NotificationData;
  priority: NotificationPriority;
  isSilent: boolean;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_GROUP_MESSAGE = 'NEW_GROUP_MESSAGE',
  MENTION = 'MENTION',
  REPLY = 'REPLY',
  GROUP_INVITE = 'GROUP_INVITE',
  STATUS_VIEW = 'STATUS_VIEW',
  STATUS_REPLY = 'STATUS_REPLY',
  MISSED_CALL = 'MISSED_CALL',
  SYNC = 'SYNC',
}

export interface NotificationData {
  conversationId?: string;
  messageId?: string;
  groupId?: string;
  statusId?: string;
  senderId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export enum NotificationPriority {
  LOW = 'LOW',
  DEFAULT = 'DEFAULT',
  HIGH = 'HIGH',
}

export interface PushNotificationPayload {
  to: string;
  notification?: {
    title: string;
    body: string;
    icon?: string;
    badge?: number;
    sound?: string;
  };
  data: NotificationData;
  priority: 'normal' | 'high';
  contentAvailable?: boolean;
}

export interface NotificationPreferences {
  userId: string;
  enabled: boolean;
  sound: string;
  vibration: boolean;
  showPreview: boolean;
  messageNotifications: boolean;
  groupNotifications: boolean;
  statusNotifications: boolean;
  callNotifications: boolean;
  mutedConversations: string[];
  mutedGroups: string[];
  updatedAt: Date;
}
