import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const locationsData = [
  { location: 'Adolfo Gonzales Chaves', latitude: -37.96462, longitude: -60.24828 },
  { location: 'Saladillo', latitude: -35.67681, longitude: -59.70266 },
  { location: 'Las Flores', latitude: -36.01583, longitude: -59.17646 },
  { location: 'Rojas', latitude: -34.19282, longitude: -60.78802 },
  { location: 'Escobar', latitude: -34.32868, longitude: -58.77118 },
  { location: 'José C. Paz', latitude: -34.51185, longitude: -58.77763 },
  { location: 'Bahía Blanca', latitude: -38.58419, longitude: -62.16942 },
  { location: 'San Antonio de Areco', latitude: -34.22076, longitude: -59.51944 },
  { location: 'Maipú', latitude: -36.88693, longitude: -57.58612 },
  { location: 'General Alvarado', latitude: -38.20263, longitude: -58.07181 },
  { location: 'General Pueyrredón', latitude: -37.96568, longitude: -57.74303 },
  { location: 'Mar Chiquita', latitude: -37.49864, longitude: -57.64327 },
  { location: 'Villa Gesell', latitude: -37.36707, longitude: -57.06340 },
  { location: 'Pinamar', latitude: -37.11107, longitude: -56.87028 },
  { location: 'General Lavalle', latitude: -36.65075, longitude: -56.94100 },
  { location: 'La Costa', latitude: -36.69717, longitude: -56.71594 },
  { location: 'Magdalena', latitude: -35.18510, longitude: -57.68613 },
  { location: 'Vicente López', latitude: -34.52653, longitude: -58.50449 },
  { location: 'Rauch', latitude: -36.57219, longitude: -58.94414 },
  { location: 'Moreno', latitude: -34.61068, longitude: -58.81090 },
  { location: 'La Matanza', latitude: -34.77035, longitude: -58.62545 },
  { location: 'Tandil', latitude: -37.33643, longitude: -59.18198 },
  { location: 'Coronel Suárez', latitude: -37.53486, longitude: -61.88909 },
  { location: 'Salliqueló', latitude: -36.67178, longitude: -63.04797 },
  { location: 'Berazategui', latitude: -34.81824, longitude: -58.15546 },
  { location: 'General Paz', latitude: -35.46618, longitude: -58.38965 },
  { location: 'General Guido', latitude: -36.66603, longitude: -57.99574 },
  { location: 'General Juan Madariaga', latitude: -37.15352, longitude: -57.23066 },
  { location: 'Tornquist', latitude: -38.25764, longitude: -62.29057 },
  { location: 'Coronel Pringles', latitude: -38.14792, longitude: -61.26442 },
  { location: 'Villarino', latitude: -39.12857, longitude: -62.72460 },
  { location: 'General Pinto', latitude: -34.66962, longitude: -62.03985 },
  { location: 'San Cayetano', latitude: -38.38907, longitude: -59.58633 },
  { location: 'Tres Arroyos', latitude: -38.51181, longitude: -60.23742 },
  { location: 'Coronel Dorrego', latitude: -38.67082, longitude: -61.09555 },
  { location: 'Necochea', latitude: -38.25541, longitude: -59.16739 },
  { location: 'Chascomús', latitude: -35.61869, longitude: -57.90398 },
  { location: 'Punta Indio', latitude: -35.42606, longitude: -57.39923 },
  { location: 'Lezama', latitude: -35.84921, longitude: -57.89484 },
  { location: 'Campana', latitude: -34.13839, longitude: -58.88296 },
  { location: 'Adolfo Alsina', latitude: -37.19676, longitude: -63.05606 },
  { location: 'Pellegrini', latitude: -36.27119, longitude: -63.22575 },
  { location: 'Ensenada', latitude: -34.84215, longitude: -57.97911 },
  { location: 'Pergamino', latitude: -33.83607, longitude: -60.54478 },
  { location: 'Puán', latitude: -38.07608, longitude: -63.05743 },
  { location: 'General Villegas', latitude: -34.77026, longitude: -62.95420 },
  { location: 'San Fernando', latitude: -34.15584, longitude: -58.53458 },
  { location: 'Tigre', latitude: -34.38202, longitude: -58.58817 },
  { location: 'Ezeiza', latitude: -34.87610, longitude: -58.56470 },
  { location: 'Castelli', latitude: -36.04149, longitude: -57.65743 },
  { location: 'Almirante Brown', latitude: -34.83562, longitude: -58.36737 },
  { location: 'Presidente Perón', latitude: -34.92985, longitude: -58.39808 },
  { location: 'Junín', latitude: -34.54648, longitude: -61.00525 },
  { location: 'Brandsen', latitude: -35.22252, longitude: -58.17523 },
  { location: 'Chivilcoy', latitude: -34.91549, longitude: -59.95842 },
  { location: 'Alberti', latitude: -35.03697, longitude: -60.28198 },
  { location: 'Bragado', latitude: -35.06141, longitude: -60.60405 },
  { location: 'General Las Heras', latitude: -34.90942, longitude: -58.99545 },
  { location: 'Carlos Casares', latitude: -35.74992, longitude: -61.37438 },
  { location: 'Marcos Paz', latitude: -34.81400, longitude: -58.84783 },
  { location: 'General Viamonte', latitude: -34.99778, longitude: -61.04966 },
  { location: 'Carlos Tejedor', latitude: -35.37974, longitude: -62.42979 },
  { location: '25 de Mayo', latitude: -35.52721, longitude: -60.23028 },
  { location: '9 de Julio', latitude: -35.48123, longitude: -60.97543 },
  { location: 'Pehuajó', latitude: -35.88362, longitude: -61.92813 },
  { location: 'Tapalqué', latitude: -36.34714, longitude: -60.13107 },
  { location: 'Trenque Lauquen', latitude: -36.05677, longitude: -62.63508 },
  { location: 'General Belgrano', latitude: -35.83466, longitude: -58.69808 },
  { location: 'Monte', latitude: -35.50983, longitude: -58.76724 },
  { location: 'Roque Pérez', latitude: -35.48164, longitude: -59.35751 },
  { location: 'Olavarría', latitude: -36.85763, longitude: -60.67021 },
  { location: 'Merlo', latitude: -34.71100, longitude: -58.74196 },
  { location: 'Esteban Echeverría', latitude: -34.83121, longitude: -58.47695 },
  { location: 'Arrecifes', latitude: -34.01181, longitude: -60.06266 },
  { location: 'Capitán Sarmiento', latitude: -34.14984, longitude: -59.85401 },
  { location: 'Carmen de Areco', latitude: -34.40680, longitude: -59.88441 },
  { location: 'Salto', latitude: -34.27108, longitude: -60.30529 },
  { location: 'Exaltación de la Cruz', latitude: -34.29513, longitude: -59.15595 },
  { location: 'San Miguel', latitude: -34.55213, longitude: -58.69178 },
  { location: 'San Andrés de Giles', latitude: -34.43773, longitude: -59.47320 },
  { location: 'Mercedes', latitude: -34.69732, longitude: -59.42048 },
  { location: 'Pilar', latitude: -34.44816, longitude: -58.90333 },
  { location: 'Luján', latitude: -34.56732, longitude: -59.15846 },
  { location: 'Hurlingham', latitude: -34.59928, longitude: -58.64953 },
  { location: 'Morón', latitude: -34.64939, longitude: -58.61983 },
  { location: 'Chacabuco', latitude: -34.61820, longitude: -60.35431 },
  { location: 'Malvinas Argentinas', latitude: -34.48731, longitude: -58.71214 },
  { location: 'Tres Lomas', latitude: -36.49710, longitude: -62.86391 },
  { location: 'Ayacucho', latitude: -37.03543, longitude: -58.44256 },
  { location: 'Guaminí', latitude: -36.89068, longitude: -62.41853 },
  { location: 'General San Martín', latitude: -34.55277, longitude: -58.56428 },
  { location: 'Lincoln', latitude: -35.07045, longitude: -61.68246 },
  { location: 'Laprida', latitude: -37.51651, longitude: -60.76815 },
  { location: 'San Isidro', latitude: -34.48689, longitude: -58.53721 },
  { location: 'Benito Juárez', latitude: -37.58611, longitude: -59.88840 },
  { location: 'Colón', latitude: -33.88586, longitude: -61.06248 },
  { location: 'Ituzaingó', latitude: -34.63607, longitude: -58.68876 },
  { location: 'General Rodríguez', latitude: -34.65062, longitude: -58.98785 },
  { location: 'Suipacha', latitude: -34.74857, longitude: -59.70339 },
  { location: 'Tres de Febrero', latitude: -34.59601, longitude: -58.57919 },
  { location: 'Florencio Varela', latitude: -34.87774, longitude: -58.25855 },
  { location: 'Navarro', latitude: -35.03048, longitude: -59.42936 },
  { location: 'Cañuelas', latitude: -35.14480, longitude: -58.69109 },
  { location: 'San Vicente', latitude: -35.07151, longitude: -58.43181 },
  { location: 'Lobos', latitude: -35.21959, longitude: -59.14574 },
  { location: 'General Alvear', latitude: -36.03471, longitude: -60.13315 },
  { location: 'Quilmes', latitude: -34.73497, longitude: -58.27686 },
  { location: 'Pila', latitude: -36.20298, longitude: -58.34044 },
  { location: 'General La Madrid', latitude: -37.35613, longitude: -61.34413 },
  { location: 'Bolívar', latitude: -36.29895, longitude: -61.14986 },
  { location: 'Balcarce', latitude: -37.71462, longitude: -58.27175 },
  { location: 'Hipólito Yrigoyen', latitude: -36.25919, longitude: -61.66019 },
  { location: 'Dolores', latitude: -36.39894, longitude: -57.63193 },
  { location: 'Azul', latitude: -36.78594, longitude: -59.69648 },
  { location: 'Daireaux', latitude: -36.64087, longitude: -61.89125 },
  { location: 'Saavedra', latitude: -37.77064, longitude: -62.43438 },
  { location: 'Monte Hermoso', latitude: -38.96162, longitude: -61.29215 },
  { location: 'Lobería', latitude: -38.09005, longitude: -58.69355 },
  { location: 'Berisso', latitude: -34.90936, longitude: -57.82838 },
  { location: 'Tordillo', latitude: -36.39052, longitude: -57.27381 },
  { location: 'Zárate', latitude: -33.99709, longitude: -59.12822 },
  { location: 'Ramallo', latitude: -33.58719, longitude: -60.05751 },
  { location: 'San Nicolás', latitude: -33.48299, longitude: -60.29315 },
  { location: 'Lanús', latitude: -34.70565, longitude: -58.39470 },
  { location: 'Leandro N. Alem', latitude: -34.49857, longitude: -61.61259 },
  { location: 'General Arenales', latitude: -34.23790, longitude: -61.28338 },
  { location: 'Rivadavia', latitude: -35.58106, longitude: -63.09476 },
  { location: 'Patagones', latitude: -40.19638, longitude: -62.85080 },
  { location: 'Coronel de Marina Leonardo Rosales', latitude: -38.84908, longitude: -61.83558 },
  { location: 'Baradero', latitude: -33.93196, longitude: -59.49279 },
  { location: 'San Pedro', latitude: -33.78099, longitude: -59.78263 },
  { location: 'Florentino Ameghino', latitude: -34.87411, longitude: -62.40172 },
  { location: 'Lomas de Zamora', latitude: -34.75497, longitude: -58.42410 },
  { location: 'Avellaneda', latitude: -34.67820, longitude: -58.34114 },
  { location: 'La Plata', latitude: -35.00385, longitude: -58.01778 },
];

async function main() {
  // --- Locations ---
  for (const loc of locationsData) {
    await prisma.location.upsert({
      where: { location: loc.location },
      update: {},
      create: { location: loc.location, latitude: loc.latitude, longitude: loc.longitude },
    });
  }
  console.log(`✅ ${locationsData.length} locations seeded`);

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