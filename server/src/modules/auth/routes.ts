
import { Router } from 'express';
import { AuthService } from './service';
import { registerSchema, loginSchema } from './schema';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';
import { authLimiter } from '../../middleware/rateLimit';

const router = Router();

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await AuthService.register(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await AuthService.getMe(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export { router as authRoutes };
