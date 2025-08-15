import { createApp } from './app';
import { env } from './env';
import { prisma } from './lib/prisma';
import { logger } from './lib/logger';
import { createTestUser } from './modules/auth/testuser';

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Create test user if it doesn't exist
    await createTestUser();

    const app = createApp();
    const port = parseInt(env.PORT);

    app.listen(port, '0.0.0.0', () => {
      logger.info(`🚀 QuickCal AI server running on port ${port}`);
      logger.info(`📱 Health check: http://localhost:${port}/health`);
      logger.info(`📚 API docs: http://localhost:${port}/api/docs`);
      logger.info(`��� API: http://localhost:${port}/api`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('🛑 Received SIGTERM, shutting down gracefully');
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('🛑 Received SIGINT, shutting down gracefully');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
