export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId?: string;
  type: MessageType;
  content: MessageContent;
  replyToId?: string;
  forwardedFrom?: string;
  editedAt?: Date;
  deletedAt?: Date;
  deletedFor?: DeletedFor[];
  status: MessageStatus;
  timestamp: Date;
  deliveredAt?: Date;
  readAt?: Date;
  encryptedContent?: string;
  encryptionKeyId?: string;
  sequenceNumber: number;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  VOICE = 'VOICE',
  DOCUMENT = 'DOCUMENT',
  LOCATION = 'LOCATION',
  CONTACT = 'CONTACT',
  STICKER = 'STICKER',
  GIF = 'GIF',
  POLL = 'POLL',
  SYSTEM = 'SYSTEM',
}

export type MessageContent =
  | TextMessageContent
  | MediaMessageContent
  | LocationMessageContent
  | ContactMessageContent
  | PollMessageContent
  | SystemMessageContent;

export interface TextMessageContent {
  text: string;
  mentions?: Mention[];
  links?: Link[];
  formatting?: TextFormatting[];
}

export interface MediaMessageContent {
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  caption?: string;
  fileName?: string;
  isViewOnce?: boolean;
  encryptedKey?: string;
}

export interface LocationMessageContent {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface ContactMessageContent {
  name: string;
  phoneNumbers: string[];
  emails?: string[];
}

export interface PollMessageContent {
  question: string;
  options: PollOption[];
  allowMultipleAnswers: boolean;
  expiresAt?: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

export interface SystemMessageContent {
  action: SystemMessageAction;
  actorId?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

export enum SystemMessageAction {
  GROUP_CREATED = 'GROUP_CREATED',
  MEMBER_ADDED = 'MEMBER_ADDED',
  MEMBER_REMOVED = 'MEMBER_REMOVED',
  MEMBER_LEFT = 'MEMBER_LEFT',
  ADMIN_PROMOTED = 'ADMIN_PROMOTED',
  ADMIN_DEMOTED = 'ADMIN_DEMOTED',
  GROUP_NAME_CHANGED = 'GROUP_NAME_CHANGED',
  GROUP_ICON_CHANGED = 'GROUP_ICON_CHANGED',
  GROUP_DESCRIPTION_CHANGED = 'GROUP_DESCRIPTION_CHANGED',
  MESSAGES_ENCRYPTED = 'MESSAGES_ENCRYPTED',
}

export interface Mention {
  userId: string;
  start: number;
  length: number;
}

export interface Link {
  url: string;
  start: number;
  length: number;
  preview?: LinkPreview;
}

export interface LinkPreview {
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
}

export interface TextFormatting {
  type: FormattingType;
  start: number;
  length: number;
}

export enum FormattingType {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  STRIKETHROUGH = 'STRIKETHROUGH',
  MONOSPACE = 'MONOSPACE',
}

export enum MessageStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export interface DeletedFor {
  userId: string;
  deletedAt: Date;
}

export interface MessageEdit {
  messageId: string;
  previousContent: MessageContent;
  editedAt: Date;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface MessageDeliveryReceipt {
  messageId: string;
  userId: string;
  status: MessageStatus;
  timestamp: Date;
}
