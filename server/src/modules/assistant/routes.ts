
import { Router } from 'express';
import { AssistantService } from './service';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  stream: z.boolean().optional()
});

const router = Router();

router.post('/chat', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { messages, stream } = chatSchema.parse(req.body);
    
    // Save user message
    const userMessage = messages[messages.length - 1];
    if (userMessage.role === 'user') {
      await prisma.chatMessage.create({
        data: {
          userId: req.user!.id,
          role: userMessage.role,
          content: userMessage.content
        }
      });
    }

    const response = await AssistantService.chat(messages, stream);

    // Save assistant response
    await prisma.chatMessage.create({
      data: {
        userId: req.user!.id,
        role: 'assistant',
        content: response
      }
    });

    res.json({ 
      message: {
        role: 'assistant',
        content: response
      }
    });
  } catch (error) {
    next(error);
  }
});

export { router as assistantRoutes };
