import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createLogger } from '@talkon/shared';
import { SocketService } from './websocket/socket.service';
import { MongoService } from './services/mongo.service';
import { MessageService } from './services/message.service';
import { RedisService } from './services/redis.service';
import { messageRouter } from './routes/message.routes';
import { conversationRouter } from './routes/conversation.routes';
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const logger = createLogger('messaging-service');
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'messaging-service',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/messages', authMiddleware, messageRouter);
app.use('/api/conversations', authMiddleware, conversationRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await MongoService.getInstance().connect();
    logger.info('MongoDB connected');

    await RedisService.getInstance().connect();
    logger.info('Redis connected');

    SocketService.getInstance().initialize(httpServer);

    httpServer.listen(PORT, () => {
      logger.info(`Messaging service listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  await MongoService.getInstance().disconnect();
  await RedisService.getInstance().disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
