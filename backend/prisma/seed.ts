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

  for (const name of sportNames) {
    await prisma.sport.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // --- Users ---
  const users = [
    { username: 'john_doe', email: 'john@example.com', password: 'pass1234' },
    { username: 'jane_smith', email: 'jane@example.com', password: 'pass1234' },
    { username: 'carlos_m', email: 'carlos@example.com', password: 'pass1234' },
    { username: 'ana_perez', email: 'ana@example.com', password: 'pass1234' },
    { username: 'mike_j', email: 'mike@example.com', password: 'pass1234' },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
