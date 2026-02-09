export interface Conversation {
  id: string;
  type: ConversationType;
  participants: string[];
  lastMessage?: ConversationLastMessage;
  unreadCount: Record<string, number>;
  mutedUntil?: Record<string, Date>;
  pinnedBy?: string[];
  archivedBy?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
}

export interface ConversationLastMessage {
  messageId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: string;
}

export interface ConversationMetadata {
  conversationId: string;
  userId: string;
  isPinned: boolean;
  isArchived: boolean;
  isMuted: boolean;
  mutedUntil?: Date;
  unreadCount: number;
  lastReadMessageId?: string;
  lastReadAt?: Date;
}
