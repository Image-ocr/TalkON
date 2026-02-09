import { z } from 'zod';

export const phoneNumberSchema = z
  .string()
  .min(10)
  .max(15)
  .regex(/^\+?[1-9]\d{9,14}$/);

export const otpSchema = z.string().length(6).regex(/^\d{6}$/);

export const uuidSchema = z.string().uuid();

export const usernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_]+$/);

export const displayNameSchema = z.string().min(1).max(50);

export const messageTextSchema = z.string().min(1).max(10000);

export const groupNameSchema = z.string().min(1).max(100);

export const groupDescriptionSchema = z.string().max(500);

export const aboutSchema = z.string().max(200);

export const emailSchema = z.string().email();

export const urlSchema = z.string().url();

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const mediaUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().int().positive().max(100 * 1024 * 1024),
  conversationId: uuidSchema.optional(),
  isViewOnce: z.boolean().optional(),
});

export const createMessageSchema = z.object({
  conversationId: uuidSchema,
  type: z.enum([
    'TEXT',
    'IMAGE',
    'VIDEO',
    'AUDIO',
    'VOICE',
    'DOCUMENT',
    'LOCATION',
    'CONTACT',
  ]),
  content: z.record(z.unknown()),
  replyToId: uuidSchema.optional(),
});

export const createGroupSchema = z.object({
  name: groupNameSchema,
  description: groupDescriptionSchema.optional(),
  memberIds: z.array(uuidSchema).min(1).max(256),
});

export const updateGroupSchema = z.object({
  name: groupNameSchema.optional(),
  description: groupDescriptionSchema.optional(),
});

export const createStatusSchema = z.object({
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO']),
  content: z.record(z.unknown()),
  privacy: z.object({
    level: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS']),
    selectedContacts: z.array(uuidSchema).optional(),
    excludedContacts: z.array(uuidSchema).optional(),
  }),
});

export const updateUserProfileSchema = z.object({
  displayName: displayNameSchema.optional(),
  username: usernameSchema.optional(),
  about: aboutSchema.optional(),
  hidePhoneNumber: z.boolean().optional(),
});

export const updateUserSettingsSchema = z.object({
  privacyLastSeen: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS', 'NOBODY']).optional(),
  privacyProfilePhoto: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS', 'NOBODY']).optional(),
  privacyAbout: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS', 'NOBODY']).optional(),
  privacyStatus: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS', 'NOBODY']).optional(),
  privacyGroups: z.enum(['EVERYONE', 'CONTACTS', 'CONTACTS_EXCEPT', 'SELECTED_CONTACTS', 'NOBODY']).optional(),
  readReceipts: z.boolean().optional(),
  typingIndicators: z.boolean().optional(),
  notificationsEnabled: z.boolean().optional(),
  notificationSound: z.string().optional(),
  theme: z.enum(['LIGHT', 'DARK', 'AUTO']).optional(),
  language: z.string().optional(),
});

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

export const validatePartial = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Partial<T> => {
  return schema.partial().parse(data);
};

export const isValid = <T>(schema: z.ZodSchema<T>, data: unknown): boolean => {
  try {
    schema.parse(data);
    return true;
  } catch {
    return false;
  }
};
