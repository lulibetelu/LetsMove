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

  const sports = await prisma.sport.findMany();
  const sportMap = Object.fromEntries(sports.map((s) => [s.name, s.id]));

  // --- Users ---
  const userInfo = [
    { username: 'john_doe', email: 'john@example.com', password: 'pass1234' },
    { username: 'jane_smith', email: 'jane@example.com', password: 'pass1234' },
    { username: 'carlos_m', email: 'carlos@example.com', password: 'pass1234' },
    { username: 'ana_perez', email: 'ana@example.com', password: 'pass1234' },
    { username: 'mike_j', email: 'mike@example.com', password: 'pass1234' },
  ];

  for (const userData of userInfo) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }

  const users = await prisma.user.findMany();
  const userMap = Object.fromEntries(users.map((u) => [u.username, u.id]));

  const preferences = [
    { username: 'john_doe', sports: ['Football', 'Running'] },
    { username: 'jane_smith', sports: ['Tennis', 'Swimming'] },
    { username: 'carlos_m', sports: ['Football', 'Basketball', 'Cycling'] },
    { username: 'ana_perez', sports: ['Volleyball', 'Running'] },
    { username: 'mike_j', sports: ['Basketball', 'Cycling'] },
  ];

  for (const { username, sports } of preferences) {
    for (const sport of sports) {
      await prisma.preference.upsert({
        where: {
          userId_sportId: {
            userId: userMap[username],
            sportId: sportMap[sport],
          },
        },
        update: {},
        create: {
          userId: userMap[username],
          sportId: sportMap[sport],
          level: 'intermediate',
        },
      });
    }
  }

  const postsData = [
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
    {
      username: 'john_doe',
      content: 'Just finished a 10k run!',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'What a match yesterday, Football is life',
      sports: ['Football'],
    },
    {
      username: 'jane_smith',
      content: 'Tennis practice was intense today',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Morning swim session done',
      sports: ['Swimming'],
    },
    {
      username: 'carlos_m',
      content: 'Basketball and cycling on the same day, exhausted',
      sports: ['Basketball', 'Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Football season is back!',
      sports: ['Football'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball tournament this weekend!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Running 5k every morning this week',
      sports: ['Running'],
    },
    {
      username: 'mike_j',
      content: 'NBA playoffs are insane this year',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Long cycling route today, 80km',
      sports: ['Cycling'],
    },
  ];

  for (const { username, content, sports } of postsData) {
    const post = await prisma.post.create({
      data: { content, userId: userMap[username] },
    });

    await prisma.postSport.createMany({
      data: sports.map((sport) => ({
        postId: post.id,
        sportId: sportMap[sport],
      })),
    });

    const matchingUsers = await prisma.preference.findMany({
      where: { sportId: { in: sports.map((s) => sportMap[s]) } },
      select: { userId: true },
    });

    const sportMatchByUser = matchingUsers.reduce(
      (acc, { userId }) => {
        acc[userId] = (acc[userId] ?? 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    if (Object.keys(sportMatchByUser).length > 0) {
      await prisma.postScore.createMany({
        data: Object.entries(sportMatchByUser).map(([userId, sportMatch]) => ({
          userId: Number(userId),
          postId: post.id,
          sportMatch,
        })),
      });
    }
  }

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
