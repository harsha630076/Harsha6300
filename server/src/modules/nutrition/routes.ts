
import { Router } from 'express';
import { NutritionService } from './service';
import { authenticateToken } from '../../middleware/auth';

const router = Router();

router.get('/search', authenticateToken, async (req, res, next) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }
    
    const results = await NutritionService.searchFoods(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post('/calc', authenticateToken, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }
    
    const totals = NutritionService.calculateTotals(items);
    res.json(totals);
  } catch (error) {
    next(error);
  }
});

export { router as nutritionRoutes };
