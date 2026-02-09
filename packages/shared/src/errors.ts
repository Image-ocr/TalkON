import { ErrorCode } from '@talkon/types';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', details?: Record<string, unknown>) {
    super(ErrorCode.UNAUTHORIZED, message, 401, details);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', details?: Record<string, unknown>) {
    super(ErrorCode.FORBIDDEN, message, 403, details);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not found', details?: Record<string, unknown>) {
    super(ErrorCode.NOT_FOUND, message, 404, details);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request', details?: Record<string, unknown>) {
    super(ErrorCode.BAD_REQUEST, message, 400, details);
    this.name = 'BadRequestError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: Record<string, unknown>) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded', details?: Record<string, unknown>) {
    super(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429, details);
    this.name = 'RateLimitError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict', details?: Record<string, unknown>) {
    super(ErrorCode.CONFLICT, message, 409, details);
    this.name = 'ConflictError';
  }
}

export class InternalError extends AppError {
  constructor(message: string = 'Internal server error', details?: Record<string, unknown>) {
    super(ErrorCode.INTERNAL_ERROR, message, 500, details);
    this.name = 'InternalError';
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service unavailable', details?: Record<string, unknown>) {
    super(ErrorCode.SERVICE_UNAVAILABLE, message, 503, details);
    this.name = 'ServiceUnavailableError';
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string = 'Invalid credentials', details?: Record<string, unknown>) {
    super(ErrorCode.INVALID_CREDENTIALS, message, 401, details);
    this.name = 'InvalidCredentialsError';
  }
}

export class InvalidOTPError extends AppError {
  constructor(message: string = 'Invalid OTP', details?: Record<string, unknown>) {
    super(ErrorCode.INVALID_OTP, message, 400, details);
    this.name = 'InvalidOTPError';
  }
}

export class OTPExpiredError extends AppError {
  constructor(message: string = 'OTP expired', details?: Record<string, unknown>) {
    super(ErrorCode.OTP_EXPIRED, message, 400, details);
    this.name = 'OTPExpiredError';
  }
}

export class TokenExpiredError extends AppError {
  constructor(message: string = 'Token expired', details?: Record<string, unknown>) {
    super(ErrorCode.TOKEN_EXPIRED, message, 401, details);
    this.name = 'TokenExpiredError';
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string = 'Invalid token', details?: Record<string, unknown>) {
    super(ErrorCode.INVALID_TOKEN, message, 401, details);
    this.name = 'InvalidTokenError';
  }
}

export class EncryptionError extends AppError {
  constructor(message: string = 'Encryption error', details?: Record<string, unknown>) {
    super(ErrorCode.ENCRYPTION_ERROR, message, 500, details);
    this.name = 'EncryptionError';
  }
}

export class MediaUploadError extends AppError {
  constructor(message: string = 'Media upload failed', details?: Record<string, unknown>) {
    super(ErrorCode.MEDIA_UPLOAD_FAILED, message, 500, details);
    this.name = 'MediaUploadError';
  }
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const formatError = (error: unknown): { code: string; message: string; details?: Record<string, unknown> } => {
  if (isAppError(error)) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }
  
  if (error instanceof Error) {
    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message,
    };
  }
  
  return {
    code: ErrorCode.INTERNAL_ERROR,
    message: 'An unknown error occurred',
  };
};
