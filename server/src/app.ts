
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './docs/openapi';
import { errorHandler, notFound } from './middleware/errors';
import { apiLimiter } from './middleware/rateLimit';

// Route imports
import { authRoutes } from './modules/auth/routes';
import { profileRoutes } from './modules/profile/routes';
import { moodRoutes } from './modules/mood/routes';
import { mealsRoutes } from './modules/meals/routes';
import { nutritionRoutes } from './modules/nutrition/routes';
import { coachRoutes } from './modules/coach/routes';
import { assistantRoutes } from './modules/assistant/routes';
import { recognitionRoutes } from './modules/recognition/routes';

export function createApp() {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true
  }));
  
  // General middleware
  app.use(compression());
  app.use(morgan('combined'));
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Rate limiting
  app.use('/api', apiLimiter);

  // API documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/mood', moodRoutes);
  app.use('/api/meals', mealsRoutes);
  app.use('/api/nutrition', nutritionRoutes);
  app.use('/api/coach', coachRoutes);
  app.use('/api/assistant', assistantRoutes);
  app.use('/api/recognition', recognitionRoutes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
