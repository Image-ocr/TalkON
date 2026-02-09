import crypto from 'crypto';
import { v7 as uuidv7 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '@talkon/types';

export const generateId = (): string => {
  return uuidv7();
};

export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const hashString = (input: string): string => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

export const generateToken = (
  payload: Omit<TokenPayload, 'iat' | 'exp'>,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (
  token: string,
  secret: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

export const normalizePhoneNumber = (
  phoneNumber: string,
  countryCode: string
): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.startsWith(countryCode)) {
    return `+${cleaned}`;
  }
  return `+${countryCode}${cleaned}`;
};

export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const parseUserAgent = (
  userAgent: string
): { platform: string; browser: string; version: string } => {
  const ua = userAgent.toLowerCase();
  
  let platform = 'unknown';
  if (ua.includes('android')) platform = 'android';
  else if (ua.includes('iphone') || ua.includes('ipad')) platform = 'ios';
  else if (ua.includes('windows')) platform = 'windows';
  else if (ua.includes('mac')) platform = 'macos';
  else if (ua.includes('linux')) platform = 'linux';
  
  let browser = 'unknown';
  let version = 'unknown';
  
  if (ua.includes('chrome')) {
    browser = 'chrome';
    const match = ua.match(/chrome\/(\d+)/);
    if (match) version = match[1];
  } else if (ua.includes('safari')) {
    browser = 'safari';
    const match = ua.match(/version\/(\d+)/);
    if (match) version = match[1];
  } else if (ua.includes('firefox')) {
    browser = 'firefox';
    const match = ua.match(/firefox\/(\d+)/);
    if (match) version = match[1];
  }
  
  return { platform, browser, version };
};

export const maskPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length < 4) return phoneNumber;
  const lastFour = phoneNumber.slice(-4);
  const masked = '*'.repeat(phoneNumber.length - 4);
  return masked + lastFour;
};

export const getFileExtension = (fileName: string): string => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const isExpired = (date: Date): boolean => {
  return new Date() > date;
};

export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

export const addHours = (date: Date, hours: number): Date => {
  return new Date(date.getTime() + hours * 3600000);
};

export const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * 86400000);
};
