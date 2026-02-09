import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createLogger } from '@talkon/shared';
import { WS_EVENTS } from '@talkon/types';

const logger = createLogger('socket-service');

export class SocketService {
  private static instance: SocketService;
  private io: Server | null = null;
  private userSockets: Map<string, Set<string>> = new Map(); // userId -> set of socketIds

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  initialize(server: HttpServer): void {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
      },
      pingTimeout: 60000,
    });

    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });

    logger.info('WebSocket service initialized');
  }

  private handleConnection(socket: Socket): void {
    const userId = socket.handshake.query.userId as string;
    const deviceId = socket.handshake.query.deviceId as string;

    if (!userId) {
      logger.warn('Socket connection attempt without userId');
      socket.disconnect();
      return;
    }

    logger.info(`User connected: ${userId} (${socket.id})`);

    // Add to user sockets map
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)?.add(socket.id);

    // Join user-specific room
    socket.join(`user:${userId}`);
    
    // Join device-specific room
    if (deviceId) {
      socket.join(`device:${deviceId}`);
    }

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${userId} (${socket.id})`);
      this.userSockets.get(userId)?.delete(socket.id);
      if (this.userSockets.get(userId)?.size === 0) {
        this.userSockets.delete(userId);
      }
    });

    // Handle typing indicator
    socket.on(WS_EVENTS.TYPING_START, (data) => {
      socket.to(`conversation:${data.conversationId}`).emit(WS_EVENTS.TYPING_START, {
        userId,
        conversationId: data.conversationId,
      });
    });

    socket.on(WS_EVENTS.TYPING_STOP, (data) => {
      socket.to(`conversation:${data.conversationId}`).emit(WS_EVENTS.TYPING_STOP, {
        userId,
        conversationId: data.conversationId,
      });
    });

    // Handle joining/leaving conversation rooms
    socket.on('join_conversation', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
      logger.debug(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on('leave_conversation', (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
      logger.debug(`Socket ${socket.id} left conversation ${conversationId}`);
    });
  }

  emitToUser(userId: string, event: string, data: any): void {
    this.io?.to(`user:${userId}`).emit(event, data);
  }

  emitToDevice(deviceId: string, event: string, data: any): void {
    this.io?.to(`device:${deviceId}`).emit(event, data);
  }

  emitToConversation(conversationId: string, event: string, data: any, excludeUserId?: string): void {
    if (excludeUserId) {
      // Use socket-level broadcast if we need to exclude a sender, 
      // but here we are in a service, so we might need to handle it differently
      // For now, let's just emit to the whole room.
      this.io?.to(`conversation:${conversationId}`).emit(event, data);
    } else {
      this.io?.to(`conversation:${conversationId}`).emit(event, data);
    }
  }

  getIO(): Server {
    if (!this.io) {
      throw new Error('Socket.io not initialized');
    }
    return this.io;
  }
}
