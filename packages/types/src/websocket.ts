export interface WebSocketMessage<T = unknown> {
  type: WebSocketMessageType;
  payload: T;
  id?: string;
  timestamp: Date;
}

export enum WebSocketMessageType {
  AUTH = 'AUTH',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
  
  PING = 'PING',
  PONG = 'PONG',
  
  MESSAGE_NEW = 'MESSAGE_NEW',
  MESSAGE_DELIVERED = 'MESSAGE_DELIVERED',
  MESSAGE_READ = 'MESSAGE_READ',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  MESSAGE_EDITED = 'MESSAGE_EDITED',
  MESSAGE_REACTION = 'MESSAGE_REACTION',
  
  TYPING_START = 'TYPING_START',
  TYPING_STOP = 'TYPING_STOP',
  
  PRESENCE_UPDATE = 'PRESENCE_UPDATE',
  USER_ONLINE = 'USER_ONLINE',
  USER_OFFLINE = 'USER_OFFLINE',
  
  CONVERSATION_UPDATED = 'CONVERSATION_UPDATED',
  
  GROUP_MEMBER_ADDED = 'GROUP_MEMBER_ADDED',
  GROUP_MEMBER_REMOVED = 'GROUP_MEMBER_REMOVED',
  GROUP_UPDATED = 'GROUP_UPDATED',
  
  STATUS_NEW = 'STATUS_NEW',
  STATUS_VIEWED = 'STATUS_VIEWED',
  
  SYNC_REQUEST = 'SYNC_REQUEST',
  SYNC_RESPONSE = 'SYNC_RESPONSE',
  
  ERROR = 'ERROR',
  ACK = 'ACK',
}

export interface WebSocketAuthPayload {
  token: string;
  deviceId: string;
}

export interface WebSocketErrorPayload {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface WebSocketAckPayload {
  messageId: string;
  receivedAt: Date;
}

export interface PresenceUpdate {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface WebSocketConnection {
  id: string;
  userId: string;
  deviceId: string;
  connectedAt: Date;
  lastPingAt: Date;
  isAlive: boolean;
}
