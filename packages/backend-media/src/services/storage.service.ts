import AWS from 'aws-sdk';
import { createLogger } from '@talkon/shared';
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger('storage-service');

export class StorageService {
  private static instance: StorageService;
  private s3: AWS.S3 | null = null;
  private bucketName: string;

  private constructor() {
    this.bucketName = process.env.S3_BUCKET || 'talkon-media';
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async initialize(): Promise<void> {
    this.s3 = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
      accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
      secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });

    try {
      await this.s3.headBucket({ Bucket: this.bucketName }).promise();
    } catch (error: any) {
      if (error.code === 'NotFound') {
        await this.s3.createBucket({ Bucket: this.bucketName }).promise();
        logger.info(`Bucket ${this.bucketName} created`);
      } else {
        throw error;
      }
    }
  }

  async uploadFile(
    file: Buffer,
    mimeType: string,
    originalName: string
  ): Promise<{ url: string; key: string }> {
    if (!this.s3) throw new Error('S3 not initialized');

    const key = `${uuidv4()}-${originalName}`;
    await this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: mimeType,
      })
      .promise();

    const url = `${process.env.S3_PUBLIC_URL || 'http://localhost:9000'}/${this.bucketName}/${key}`;
    return { url, key };
  }

  async getDownloadUrl(key: string): Promise<string> {
    if (!this.s3) throw new Error('S3 not initialized');
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3600, // 1 hour
    });
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.s3) throw new Error('S3 not initialized');
    await this.s3.deleteObject({ Bucket: this.bucketName, Key: key }).promise();
  }
}
