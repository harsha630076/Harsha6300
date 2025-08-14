
import { Router } from 'express';
import { CoachEngine } from './engine';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.post('/recommendations', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { currentMood, healthStatus, recentMeals } = req.body;
    
    // Get user profile
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id }
    });

    const recommendations = CoachEngine.generateRecommendations({
      currentMood,
      healthStatus,
      recentMeals,
      profile
    });

    // Save recommendations to database
    await prisma.recommendation.create({
      data: {
        userId: req.user!.id,
        scope: 'general',
        content: recommendations
      }
    });

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

export { router as coachRoutes };
