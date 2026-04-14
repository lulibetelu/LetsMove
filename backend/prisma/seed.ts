import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // --- Sports ---
  const sportNames = [
    'Football',
    'Basketball',
    'Tennis',
    'Swimming',
    'Running',
    'Cycling',
    'Volleyball',
  ];
  const sports: Record<string, number> = {};

  for (const name of sportNames) {
    const sport = await prisma.sport.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    sports[name] = sport.id;
  }

  // --- Users + Preferences ---
  const users = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'pass1234',
      prefs: [
        { sport: 'Football', level: 'advanced' },
        { sport: 'Running', level: 'intermediate' },
      ],
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'pass1234',
      prefs: [
        { sport: 'Swimming', level: 'advanced' },
        { sport: 'Cycling', level: 'beginner' },
      ],
    },
    {
      username: 'carlos_m',
      email: 'carlos@example.com',
      password: 'pass1234',
      prefs: [
        { sport: 'Basketball', level: 'intermediate' },
        { sport: 'Football', level: 'beginner' },
      ],
    },
    {
      username: 'ana_perez',
      email: 'ana@example.com',
      password: 'pass1234',
      prefs: [
        { sport: 'Tennis', level: 'advanced' },
        { sport: 'Running', level: 'advanced' },
      ],
    },
    {
      username: 'mike_j',
      email: 'mike@example.com',
      password: 'pass1234',
      prefs: [
        { sport: 'Volleyball', level: 'beginner' },
        { sport: 'Basketball', level: 'intermediate' },
      ],
    },
  ];

  for (const { prefs, ...userData } of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    for (const { sport, level } of prefs) {
      await prisma.preference.upsert({
        where: { userId_sportId: { userId: user.id, sportId: sports[sport] } },
        update: {},
        create: { userId: user.id, sportId: sports[sport], level },
      });
    }
  }

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
