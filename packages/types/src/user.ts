export interface User {
  id: string;
  phoneNumber: string;
  phoneNumberHash: string;
  username?: string;
  displayName: string;
  about?: string;
  profilePhotoUrl?: string;
  hidePhoneNumber: boolean;
  lastSeen?: Date;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  displayName: string;
  username?: string;
  about?: string;
  profilePhotoUrl?: string;
  phoneNumber?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Contact {
  userId: string;
  contactUserId: string;
  nickname?: string;
  isBlocked: boolean;
  isFavorite: boolean;
  trustLevel: ContactTrustLevel;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContactTrustLevel {
  TRUSTED = 'TRUSTED',
  NORMAL = 'NORMAL',
  RESTRICTED = 'RESTRICTED',
}

export interface BlockedUser {
  userId: string;
  blockedUserId: string;
  reason?: string;
  createdAt: Date;
}

export interface UserSettings {
  userId: string;
  privacyLastSeen: PrivacyLevel;
  privacyProfilePhoto: PrivacyLevel;
  privacyAbout: PrivacyLevel;
  privacyStatus: PrivacyLevel;
  privacyGroups: PrivacyLevel;
  readReceipts: boolean;
  typingIndicators: boolean;
  notificationsEnabled: boolean;
  notificationSound: string;
  theme: Theme;
  language: string;
  updatedAt: Date;
}

export enum PrivacyLevel {
  EVERYONE = 'EVERYONE',
  CONTACTS = 'CONTACTS',
  CONTACTS_EXCEPT = 'CONTACTS_EXCEPT',
  SELECTED_CONTACTS = 'SELECTED_CONTACTS',
  NOBODY = 'NOBODY',
}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  AUTO = 'AUTO',
}
