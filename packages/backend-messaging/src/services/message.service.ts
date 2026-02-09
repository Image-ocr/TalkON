import { Collection, ObjectId } from 'mongodb';
import { MongoService } from './mongo.service';
import { IMessage, MessageStatus } from '@talkon/types';
import { createLogger } from '@talkon/shared';
import { SocketService } from '../websocket/socket.service';
import { WS_EVENTS } from '@talkon/types';

const logger = createLogger('message-service');

export class MessageService {
  private static instance: MessageService;
  private collection: Collection<IMessage> | null = null;

  private constructor() {}

  static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  private getCollection(): Collection<IMessage> {
    if (!this.collection) {
      this.collection = MongoService.getInstance().getCollection<IMessage>('messages');
    }
    return this.collection;
  }

  async sendMessage(message: Partial<IMessage>): Promise<IMessage> {
    const newMessage: IMessage = {
      ...message,
      id: new ObjectId().toString(),
      timestamp: new Date(),
      status: MessageStatus.SENT,
    } as IMessage;

    await this.getCollection().insertOne(newMessage as any);

    // Notify recipients via WebSocket
    if (newMessage.conversationId) {
      SocketService.getInstance().emitToConversation(
        newMessage.conversationId,
        WS_EVENTS.MESSAGE_NEW,
        newMessage
      );
    }

    return newMessage;
  }

  async getConversationMessages(
    conversationId: string,
    limit: number = 50,
    before?: Date
  ): Promise<IMessage[]> {
    const query: any = { conversationId };
    if (before) {
      query.timestamp = { $lt: before };
    }

    return this.getCollection()
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray() as unknown as Promise<IMessage[]>;
  }

  async updateMessageStatus(
    messageId: string,
    status: MessageStatus,
    userId: string
  ): Promise<void> {
    await this.getCollection().updateOne(
      { id: messageId },
      { $set: { status, updatedAt: new Date() } }
    );

    // Get the message to notify the sender
    const message = await this.getCollection().findOne({ id: messageId });
    if (message && message.senderId) {
      SocketService.getInstance().emitToUser(
        message.senderId,
        WS_EVENTS.MESSAGE_STATUS_UPDATE,
        { messageId, status, userId }
      );
    }
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    const message = await this.getCollection().findOne({ id: messageId });
    if (!message) throw new Error('Message not found');
    
    if (message.senderId !== userId) {
      throw new Error('Unauthorized to delete this message');
    }

    await this.getCollection().updateOne(
      { id: messageId },
      { $set: { isDeleted: true, content: '', updatedAt: new Date() } }
    );

    if (message.conversationId) {
      SocketService.getInstance().emitToConversation(
        message.conversationId,
        WS_EVENTS.MESSAGE_DELETE,
        { messageId }
      );
    }
  }
}
