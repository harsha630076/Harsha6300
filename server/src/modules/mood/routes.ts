
import { Router } from 'express';
import { MoodService } from './service';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

router.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const mood = await MoodService.createMood(req.user!.id, req.body);
    res.status(201).json(mood);
  } catch (error) {
    next(error);
  }
});

router.get('/today', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const moods = await MoodService.getTodayMoods(req.user!.id);
    res.json(moods);
  } catch (error) {
    next(error);
  }
});

router.get('/timeline', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const days = req.query.days ? parseInt(req.query.days as string) : 30;
    const moods = await MoodService.getMoodTimeline(req.user!.id, days);
    res.json(moods);
  } catch (error) {
    next(error);
  }
});

export { router as moodRoutes };
