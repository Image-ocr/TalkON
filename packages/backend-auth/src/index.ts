import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createLogger } from '@talkon/shared';
import { authRouter } from './routes/auth.routes';
import { deviceRouter } from './routes/device.routes';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { DatabaseService } from './services/database.service';
import { RedisService } from './services/redis.service';

dotenv.config();

const logger = createLogger('auth-service');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRouter);
app.use('/api/devices', deviceRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await DatabaseService.getInstance().connect();
    logger.info('Database connected');

    await RedisService.getInstance().connect();
    logger.info('Redis connected');

    app.listen(PORT, () => {
      logger.info(`Auth service listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  await DatabaseService.getInstance().disconnect();
  await RedisService.getInstance().disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
