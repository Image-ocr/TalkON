import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createLogger } from '@talkon/shared';
import { notificationRouter } from './routes/notification.routes';
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { NotificationService } from './services/notification.service';
import { RedisService } from './services/redis.service';

dotenv.config();

const logger = createLogger('notification-service');
const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'notification-service',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/notifications', authMiddleware, notificationRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await NotificationService.getInstance().initialize();
    await RedisService.getInstance().connect();

    app.listen(PORT, () => {
      logger.info(`Notification service listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

startServer();
