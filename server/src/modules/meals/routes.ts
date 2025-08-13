
import { Router } from 'express';
import { MealsService } from './service';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

router.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const meal = await MealsService.createMeal(req.user!.id, req.body);
    res.status(201).json(meal);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const meal = await MealsService.getMeal(req.user!.id, req.params.id);
    res.json(meal);
  } catch (error) {
    next(error);
  }
});

router.get('/day', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const date = req.query.date as string || new Date().toISOString().split('T')[0];
    const meals = await MealsService.getMealsForDay(req.user!.id, date);
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

export { router as mealsRoutes };
