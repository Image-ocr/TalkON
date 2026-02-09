import { Router } from 'express';
import { ConversationService } from '../services/conversation.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const conversationRouter = Router();

conversationRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.sub;
    const conversations = await ConversationService.getInstance().getUserConversations(userId!);
    res.json({ success: true, data: conversations });
  } catch (error) {
    next(error);
  }
});

conversationRouter.post('/direct', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.sub;
    const { recipientId } = req.body;
    const conversation = await ConversationService.getInstance().getOrCreateDirectConversation(
      userId!,
      recipientId
    );
    res.json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
});
