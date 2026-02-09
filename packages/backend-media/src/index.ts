import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createLogger } from '@talkon/shared';
import { mediaRouter } from './routes/media.routes';
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { StorageService } from './services/storage.service';

dotenv.config();

const logger = createLogger('media-service');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'media-service',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/media', authMiddleware, mediaRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    // Initialize storage service
    const storageService = StorageService.getInstance();
    await storageService.initialize();
    logger.info('Storage service initialized');

    app.listen(PORT, () => {
      logger.info(`Media service listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

startServer();
