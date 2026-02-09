import { Request, Response, NextFunction } from 'express';
import { isAppError, formatError, createLogger } from '@talkon/shared';
import { ApiResponse } from '@talkon/types';

const logger = createLogger('error-middleware');

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  logger.error('Request error', error, {
    method: req.method,
    path: req.path,
  });

  const formattedError = formatError(error);
  const statusCode = isAppError(error) ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: formattedError,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string || 'unknown',
    },
  });
};
