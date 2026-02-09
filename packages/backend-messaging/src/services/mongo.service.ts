import { MongoClient, Db, Collection } from 'mongodb';
import { createLogger } from '@talkon/shared';

const logger = createLogger('mongo-service');

export class MongoService {
  private static instance: MongoService;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  private constructor() {}

  static getInstance(): MongoService {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService();
    }
    return MongoService.instance;
  }

  async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/talkon';
    this.client = new MongoClient(uri);

    try {
      await this.client.connect();
      this.db = this.client.db();
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('Failed to connect to MongoDB', error as Error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      logger.info('Disconnected from MongoDB');
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('MongoDB not connected');
    }
    return this.db;
  }

  getCollection<T extends Document = any>(name: string): Collection<T> {
    return this.getDb().collection<T>(name);
  }
}
