export interface Status {
  id: string;
  userId: string;
  type: StatusType;
  content: StatusContent;
  privacy: StatusPrivacy;
  privacyExceptions?: string[];
  viewers: StatusView[];
  expiresAt: Date;
  createdAt: Date;
}

export enum StatusType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export type StatusContent = TextStatusContent | MediaStatusContent;

export interface TextStatusContent {
  text: string;
  backgroundColor: string;
  font?: string;
}

export interface MediaStatusContent {
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  caption?: string;
  duration?: number;
  encryptedKey?: string;
}

export interface StatusPrivacy {
  level: StatusPrivacyLevel;
  selectedContacts?: string[];
  excludedContacts?: string[];
}

export enum StatusPrivacyLevel {
  EVERYONE = 'EVERYONE',
  CONTACTS = 'CONTACTS',
  CONTACTS_EXCEPT = 'CONTACTS_EXCEPT',
  SELECTED_CONTACTS = 'SELECTED_CONTACTS',
}

export interface StatusView {
  userId: string;
  viewedAt: Date;
}

export interface StatusReply {
  id: string;
  statusId: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  createdAt: Date;
}
