import { Collection, ObjectId } from 'mongodb';
import { MongoService } from './mongo.service';
import { Conversation, ConversationType } from '@talkon/types';
import { createLogger } from '@talkon/shared';

const logger = createLogger('conversation-service');

export class ConversationService {
  private static instance: ConversationService;
  private collection: Collection<Conversation> | null = null;

  private constructor() {}

  static getInstance(): ConversationService {
    if (!ConversationService.instance) {
      ConversationService.instance = new ConversationService();
    }
    return ConversationService.instance;
  }

  private getCollection(): Collection<Conversation> {
    if (!this.collection) {
      this.collection = MongoService.getInstance().getCollection<Conversation>('conversations');
    }
    return this.collection;
  }

  async getOrCreateDirectConversation(user1Id: string, user2Id: string): Promise<Conversation> {
    const participants = [user1Id, user2Id].sort();
    
    let conversation = await this.getCollection().findOne({
      type: ConversationType.DIRECT,
      participants: { $all: participants, $size: 2 }
    });

    if (!conversation) {
      const newConversation: any = {
        id: new ObjectId().toString(),
        type: ConversationType.DIRECT,
        participants,
        unreadCount: participants.reduce((acc, id) => ({ ...acc, [id]: 0 }), {}),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await this.getCollection().insertOne(newConversation);
      conversation = newConversation;
    }

    return conversation as unknown as Conversation;
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return this.getCollection()
      .find({ participants: userId })
      .sort({ updatedAt: -1 })
      .toArray() as unknown as Promise<Conversation[]>;
  }

  async updateLastMessage(conversationId: string, lastMessage: any): Promise<void> {
    await this.getCollection().updateOne(
      { id: conversationId },
      {
        $set: {
          lastMessage,
          updatedAt: new Date(),
        },
      }
    );
  }
}
