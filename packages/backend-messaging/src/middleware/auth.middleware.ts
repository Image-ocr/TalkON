import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWT_SECRET, UnauthorizedError, InvalidTokenError } from '@talkon/shared';
import { TokenPayload } from '@talkon/types';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token, JWT_SECRET) as TokenPayload;

    if (!payload || payload.type !== 'access') {
      throw new InvalidTokenError('Invalid access token');
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
