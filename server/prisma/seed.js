"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    // Create demo user
    const hashedPassword = await bcryptjs_1.default.hash('demo123', 12);
    const user = await prisma.user.upsert({
        where: { email: 'demo@quickcal.ai' },
        update: {},
        create: {
            email: 'demo@quickcal.ai',
            passwordHash: hashedPassword,
            profile: {
                create: {
                    name: 'Demo User',
                    age: 28,
                    gender: 'non-binary',
                    heightCm: 175,
                    weightKg: 70,
                    activity: 'moderate',
                    goals: { type: 'maintenance', targetWeight: 70 },
                    preferences: { diet: 'balanced', allergies: [] },
                    conditions: []
                }
            }
        }
    });
    // Create demo meals
    await prisma.meal.create({
        data: {
            userId: user.id,
            time: new Date(),
            totalKcal: 650,
            items: {
                create: [
                    {
                        name: 'Oatmeal',
                        quantity: 100,
                        kcal: 389,
                        protein: 16.9,
                        carbs: 66.3,
                        fat: 6.9
                    },
                    {
                        name: 'Banana',
                        quantity: 120,
                        kcal: 105,
                        protein: 1.3,
                        carbs: 27,
                        fat: 0.4
                    },
                    {
                        name: 'Almonds',
                        quantity: 30,
                        kcal: 164,
                        protein: 6,
                        carbs: 6,
                        fat: 14.2
                    }
                ]
            }
        }
    });
    // Create demo mood
    await prisma.mood.create({
        data: {
            userId: user.id,
            category: 'happy',
            note: 'Feeling great after my morning workout!'
        }
    });
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map