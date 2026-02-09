export interface Media {
  id: string;
  userId: string;
  conversationId?: string;
  messageId?: string;
  statusId?: string;
  type: MediaType;
  mimeType: string;
  fileName: string;
  originalName: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  url: string;
  thumbnailUrl?: string;
  encryptedKey?: string;
  isEncrypted: boolean;
  isViewOnce: boolean;
  viewedBy?: string[];
  uploadedAt: Date;
  expiresAt?: Date;
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  VOICE = 'VOICE',
  DOCUMENT = 'DOCUMENT',
  PROFILE_PHOTO = 'PROFILE_PHOTO',
  GROUP_ICON = 'GROUP_ICON',
  STATUS = 'STATUS',
}

export interface MediaUploadRequest {
  fileName: string;
  mimeType: string;
  size: number;
  conversationId?: string;
  isViewOnce?: boolean;
}

export interface MediaUploadResponse {
  mediaId: string;
  uploadUrl: string;
  uploadMethod: 'PUT' | 'POST';
  fields?: Record<string, string>;
  expiresAt: Date;
}

export interface MediaDownloadRequest {
  mediaId: string;
}

export interface MediaDownloadResponse {
  url: string;
  expiresAt: Date;
}

export interface ChunkedUploadSession {
  id: string;
  mediaId: string;
  totalChunks: number;
  uploadedChunks: number[];
  expiresAt: Date;
  createdAt: Date;
}
