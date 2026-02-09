import { Router } from 'express';
import { AuthRequest, authenticate } from '../middleware/auth.middleware';
import { DatabaseService } from '../services/database.service';
import { User, UserProfile, ApiResponse } from '@talkon/types';
import { validate, updateUserProfileSchema } from '@talkon/shared';

const router = Router();
const db = DatabaseService.getInstance();

router.get('/me', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const userId = req.user!.userId;
    
    const users = await db.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' },
      });
    }
    
    res.json({
      success: true,
      data: users[0],
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse<User>);
  } catch (error) {
    next(error);
  }
});

router.patch('/me', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const userId = req.user!.userId;
    const updates = validate(updateUserProfileSchema, req.body);
    
    const setClauses: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (updates.displayName !== undefined) {
      setClauses.push(`display_name = $${paramIndex++}`);
      values.push(updates.displayName);
    }
    if (updates.username !== undefined) {
      setClauses.push(`username = $${paramIndex++}`);
      values.push(updates.username);
    }
    if (updates.about !== undefined) {
      setClauses.push(`about = $${paramIndex++}`);
      values.push(updates.about);
    }
    if (updates.hidePhoneNumber !== undefined) {
      setClauses.push(`hide_phone_number = $${paramIndex++}`);
      values.push(updates.hidePhoneNumber);
    }
    
    setClauses.push(`updated_at = NOW()`);
    values.push(userId);
    
    const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    const users = await db.query<User>(query, values);
    
    res.json({
      success: true,
      data: users[0],
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse<User>);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const { userId } = req.params;
    
    const users = await db.query<UserProfile>(
      `SELECT id, display_name, username, about, profile_photo_url, 
              is_online, last_seen, hide_phone_number, phone_number
       FROM users WHERE id = $1`,
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' },
      });
    }
    
    const user = users[0];
    if (user.hide_phone_number) {
      delete (user as any).phone_number;
    }
    
    res.json({
      success: true,
      data: user,
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse<UserProfile>);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
