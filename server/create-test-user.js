const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
});

async function createTestUser() {
  try {
    // Check if test user already exists
    const existing = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (existing) {
      console.log('Test user already exists: test@example.com');
      return;
    }

    // Create test user
    const passwordHash = await bcrypt.hash('password123', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      }
    });

    console.log('Created test user:', user.email);
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
