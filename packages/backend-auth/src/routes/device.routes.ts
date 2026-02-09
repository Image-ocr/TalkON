import { Router } from 'express';
import { AuthRequest, authenticate } from '../middleware/auth.middleware';
import { DatabaseService } from '../services/database.service';
import { Device, ApiResponse } from '@talkon/types';

const router = Router();
const db = DatabaseService.getInstance();

router.get('/', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const userId = req.user!.userId;
    
    const devices = await db.query<Device>(
      'SELECT * FROM devices WHERE user_id = $1 ORDER BY last_seen DESC',
      [userId]
    );
    
    res.json({
      success: true,
      data: devices,
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse<Device[]>);
  } catch (error) {
    next(error);
  }
});

router.delete('/:deviceId', authenticate, async (req: AuthRequest, res: any, next) => {
  try {
    const userId = req.user!.userId;
    const { deviceId } = req.params;
    
    await db.query(
      'UPDATE devices SET is_active = false WHERE id = $1 AND user_id = $2',
      [deviceId, userId]
    );
    
    res.json({
      success: true,
      data: { message: 'Device removed successfully' },
      metadata: { timestamp: new Date().toISOString(), requestId: 'req-id' },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
});

export { router as deviceRouter };
