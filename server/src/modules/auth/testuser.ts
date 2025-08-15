import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export async function createTestUser() {
  try {
    // Check if test user already exists
    const existing = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });

    if (existing) {
      console.log("Test user already exists: test@example.com");
      return existing;
    }

    // Create test user
    const passwordHash = await bcrypt.hash("password123", 12);

    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        passwordHash,
      },
    });

    console.log("Created test user:", user.email);
    return user;
  } catch (error) {
    console.error("Error creating test user:", error);
    throw error;
  }
}
