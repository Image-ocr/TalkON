export interface Device {
  id: string;
  userId: string;
  deviceName: string;
  deviceType: DeviceType;
  platform: Platform;
  platformVersion: string;
  appVersion: string;
  pushToken?: string;
  lastSeen: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  WEB = 'WEB',
}

export enum Platform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WINDOWS = 'WINDOWS',
  MACOS = 'MACOS',
  LINUX = 'LINUX',
  WEB = 'WEB',
}

export interface DeviceRegistration {
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  platform: Platform;
  platformVersion: string;
  appVersion: string;
  pushToken?: string;
}

export interface DeviceSyncState {
  deviceId: string;
  lastSyncedMessageId?: string;
  lastSyncedAt?: Date;
  pendingSyncCount: number;
}
