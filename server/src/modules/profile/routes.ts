
import { Router } from 'express';
import { ProfileService } from './service';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

router.get('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const profile = await ProfileService.getProfile(req.user!.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.put('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const profile = await ProfileService.updateProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

export { router as profileRoutes };
