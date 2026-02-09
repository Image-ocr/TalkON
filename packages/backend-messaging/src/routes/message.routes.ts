import { Router } from 'express';
import { MessageService } from '../services/message.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const messageRouter = Router();

messageRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.sub;
    const message = await MessageService.getInstance().sendMessage({
      ...req.body,
      senderId: userId,
    });
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
});

messageRouter.get('/conversation/:conversationId', async (req: AuthRequest, res, next) => {
  try {
    const { conversationId } = req.params;
    const { limit, before } = req.query;
    const messages = await MessageService.getInstance().getConversationMessages(
      conversationId,
      limit ? parseInt(limit as string) : 50,
      before ? new Date(before as string) : undefined
    );
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
});

messageRouter.patch('/:messageId/status', async (req: AuthRequest, res, next) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body;
    const userId = req.user?.sub;
    await MessageService.getInstance().updateMessageStatus(messageId, status, userId!);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

messageRouter.delete('/:messageId', async (req: AuthRequest, res, next) => {
  try {
    const { messageId } = req.params;
    const userId = req.user?.sub;
    await MessageService.getInstance().deleteMessage(messageId, userId!);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});
