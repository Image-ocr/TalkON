export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';

export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '30d';

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const OTP_MAX_ATTEMPTS = 5;

export const RATE_LIMIT_OTP_REQUESTS = 5;
export const RATE_LIMIT_OTP_WINDOW_MINUTES = 60;
export const RATE_LIMIT_LOGIN_ATTEMPTS = 10;
export const RATE_LIMIT_LOGIN_WINDOW_MINUTES = 15;

export const MAX_DEVICES_PER_USER = 5;
export const SESSION_INACTIVITY_DAYS = 30;

export const MAX_GROUP_MEMBERS = 512;
export const MAX_GROUP_ADMINS = 50;

export const MAX_MESSAGE_LENGTH = 10000;
export const MAX_CAPTION_LENGTH = 1000;
export const MAX_GROUP_NAME_LENGTH = 100;
export const MAX_GROUP_DESCRIPTION_LENGTH = 500;
export const MAX_DISPLAY_NAME_LENGTH = 50;
export const MAX_ABOUT_LENGTH = 200;

export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
export const MAX_AUDIO_SIZE = 16 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE = 100 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
export const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/wav'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/zip',
];

export const STATUS_EXPIRY_HOURS = 24;
export const MAX_STATUS_PER_DAY = 10;

export const MESSAGE_DELETE_TIME_LIMIT_HOURS = 48;
export const MESSAGE_EDIT_TIME_LIMIT_MINUTES = 15;

export const WEBSOCKET_PING_INTERVAL = 30000;
export const WEBSOCKET_PONG_TIMEOUT = 10000;

export const REDIS_KEY_PREFIX = 'talkon:';
export const REDIS_SESSION_PREFIX = `${REDIS_KEY_PREFIX}session:`;
export const REDIS_OTP_PREFIX = `${REDIS_KEY_PREFIX}otp:`;
export const REDIS_RATE_LIMIT_PREFIX = `${REDIS_KEY_PREFIX}ratelimit:`;
export const REDIS_PRESENCE_PREFIX = `${REDIS_KEY_PREFIX}presence:`;
export const REDIS_TYPING_PREFIX = `${REDIS_KEY_PREFIX}typing:`;

export const PAGINATION_DEFAULT_LIMIT = 20;
export const PAGINATION_MAX_LIMIT = 100;

export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

export const ENCRYPTION_ALGORITHM = 'AES-256-GCM';
export const PREKEY_BATCH_SIZE = 100;
export const PREKEY_MINIMUM_THRESHOLD = 10;

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const;

export const SERVICE_NAMES = {
  AUTH: 'auth-service',
  MESSAGING: 'messaging-service',
  MEDIA: 'media-service',
  NOTIFICATIONS: 'notification-service',
  SYNC: 'sync-service',
} as const;

export const HEALTH_CHECK_INTERVAL = 30000;

export const DATABASE_CONNECTION_TIMEOUT = 5000;
export const DATABASE_QUERY_TIMEOUT = 30000;

export const MEDIA_UPLOAD_CHUNK_SIZE = 5 * 1024 * 1024;
export const MEDIA_PRESIGNED_URL_EXPIRY = 3600;

export const NOTIFICATION_BATCH_SIZE = 100;
export const NOTIFICATION_RETRY_ATTEMPTS = 3;
export const NOTIFICATION_RETRY_DELAY = 1000;
