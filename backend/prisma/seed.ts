import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const locationsData = [
  {
    location: 'Adolfo Gonzales Chaves',
    latitude: -37.96462,
    longitude: -60.24828,
  },
  { location: 'Saladillo', latitude: -35.67681, longitude: -59.70266 },
  { location: 'Las Flores', latitude: -36.01583, longitude: -59.17646 },
  { location: 'Rojas', latitude: -34.19282, longitude: -60.78802 },
  { location: 'Escobar', latitude: -34.32868, longitude: -58.77118 },
  { location: 'José C. Paz', latitude: -34.51185, longitude: -58.77763 },
  { location: 'Bahía Blanca', latitude: -38.58419, longitude: -62.16942 },
  {
    location: 'San Antonio de Areco',
    latitude: -34.22076,
    longitude: -59.51944,
  },
  { location: 'Maipú', latitude: -36.88693, longitude: -57.58612 },
  { location: 'General Alvarado', latitude: -38.20263, longitude: -58.07181 },
  { location: 'General Pueyrredón', latitude: -37.96568, longitude: -57.74303 },
  { location: 'Mar Chiquita', latitude: -37.49864, longitude: -57.64327 },
  { location: 'Villa Gesell', latitude: -37.36707, longitude: -57.0634 },
  { location: 'Pinamar', latitude: -37.11107, longitude: -56.87028 },
  { location: 'General Lavalle', latitude: -36.65075, longitude: -56.941 },
  { location: 'La Costa', latitude: -36.69717, longitude: -56.71594 },
  { location: 'Magdalena', latitude: -35.1851, longitude: -57.68613 },
  { location: 'Vicente López', latitude: -34.52653, longitude: -58.50449 },
  { location: 'Rauch', latitude: -36.57219, longitude: -58.94414 },
  { location: 'Moreno', latitude: -34.61068, longitude: -58.8109 },
  { location: 'La Matanza', latitude: -34.77035, longitude: -58.62545 },
  { location: 'Tandil', latitude: -37.33643, longitude: -59.18198 },
  { location: 'Coronel Suárez', latitude: -37.53486, longitude: -61.88909 },
  { location: 'Salliqueló', latitude: -36.67178, longitude: -63.04797 },
  { location: 'Berazategui', latitude: -34.81824, longitude: -58.15546 },
  { location: 'General Paz', latitude: -35.46618, longitude: -58.38965 },
  { location: 'General Guido', latitude: -36.66603, longitude: -57.99574 },
  {
    location: 'General Juan Madariaga',
    latitude: -37.15352,
    longitude: -57.23066,
  },
  { location: 'Tornquist', latitude: -38.25764, longitude: -62.29057 },
  { location: 'Coronel Pringles', latitude: -38.14792, longitude: -61.26442 },
  { location: 'Villarino', latitude: -39.12857, longitude: -62.7246 },
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
  { location: 'General Villegas', latitude: -34.77026, longitude: -62.9542 },
  { location: 'San Fernando', latitude: -34.15584, longitude: -58.53458 },
  { location: 'Tigre', latitude: -34.38202, longitude: -58.58817 },
  { location: 'Ezeiza', latitude: -34.8761, longitude: -58.5647 },
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
  { location: 'Marcos Paz', latitude: -34.814, longitude: -58.84783 },
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
  { location: 'Merlo', latitude: -34.711, longitude: -58.74196 },
  { location: 'Esteban Echeverría', latitude: -34.83121, longitude: -58.47695 },
  { location: 'Arrecifes', latitude: -34.01181, longitude: -60.06266 },
  { location: 'Capitán Sarmiento', latitude: -34.14984, longitude: -59.85401 },
  { location: 'Carmen de Areco', latitude: -34.4068, longitude: -59.88441 },
  { location: 'Salto', latitude: -34.27108, longitude: -60.30529 },
  {
    location: 'Exaltación de la Cruz',
    latitude: -34.29513,
    longitude: -59.15595,
  },
  { location: 'San Miguel', latitude: -34.55213, longitude: -58.69178 },
  { location: 'San Andrés de Giles', latitude: -34.43773, longitude: -59.4732 },
  { location: 'Mercedes', latitude: -34.69732, longitude: -59.42048 },
  { location: 'Pilar', latitude: -34.44816, longitude: -58.90333 },
  { location: 'Luján', latitude: -34.56732, longitude: -59.15846 },
  { location: 'Hurlingham', latitude: -34.59928, longitude: -58.64953 },
  { location: 'Morón', latitude: -34.64939, longitude: -58.61983 },
  { location: 'Chacabuco', latitude: -34.6182, longitude: -60.35431 },
  {
    location: 'Malvinas Argentinas',
    latitude: -34.48731,
    longitude: -58.71214,
  },
  { location: 'Tres Lomas', latitude: -36.4971, longitude: -62.86391 },
  { location: 'Ayacucho', latitude: -37.03543, longitude: -58.44256 },
  { location: 'Guaminí', latitude: -36.89068, longitude: -62.41853 },
  { location: 'General San Martín', latitude: -34.55277, longitude: -58.56428 },
  { location: 'Lincoln', latitude: -35.07045, longitude: -61.68246 },
  { location: 'Laprida', latitude: -37.51651, longitude: -60.76815 },
  { location: 'San Isidro', latitude: -34.48689, longitude: -58.53721 },
  { location: 'Benito Juárez', latitude: -37.58611, longitude: -59.8884 },
  { location: 'Colón', latitude: -33.88586, longitude: -61.06248 },
  { location: 'Ituzaingó', latitude: -34.63607, longitude: -58.68876 },
  { location: 'General Rodríguez', latitude: -34.65062, longitude: -58.98785 },
  { location: 'Suipacha', latitude: -34.74857, longitude: -59.70339 },
  { location: 'Tres de Febrero', latitude: -34.59601, longitude: -58.57919 },
  { location: 'Florencio Varela', latitude: -34.87774, longitude: -58.25855 },
  { location: 'Navarro', latitude: -35.03048, longitude: -59.42936 },
  { location: 'Cañuelas', latitude: -35.1448, longitude: -58.69109 },
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
  { location: 'Lanús', latitude: -34.70565, longitude: -58.3947 },
  { location: 'Leandro N. Alem', latitude: -34.49857, longitude: -61.61259 },
  { location: 'General Arenales', latitude: -34.2379, longitude: -61.28338 },
  { location: 'Rivadavia', latitude: -35.58106, longitude: -63.09476 },
  { location: 'Patagones', latitude: -40.19638, longitude: -62.8508 },
  {
    location: 'Coronel de Marina Leonardo Rosales',
    latitude: -38.84908,
    longitude: -61.83558,
  },
  { location: 'Baradero', latitude: -33.93196, longitude: -59.49279 },
  { location: 'San Pedro', latitude: -33.78099, longitude: -59.78263 },
  {
    location: 'Florentino Ameghino',
    latitude: -34.87411,
    longitude: -62.40172,
  },
  { location: 'Lomas de Zamora', latitude: -34.75497, longitude: -58.4241 },
  { location: 'Avellaneda', latitude: -34.6782, longitude: -58.34114 },
  { location: 'La Plata', latitude: -35.00385, longitude: -58.01778 },
];

async function main() {
  // --- Locations ---
  for (const loc of locationsData) {
    await prisma.location.upsert({
      where: { location: loc.location },
      update: {},
      create: {
        location: loc.location,
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
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
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'pass1234',
      birthday: new Date('1995-03-15'),
      homeLocationName: 'La Plata',
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'pass1234',
      birthday: new Date('1998-07-22'),
      homeLocationName: 'General Pueyrredón',
    },
    {
      username: 'carlos_m',
      email: 'carlos@example.com',
      password: 'pass1234',
      birthday: new Date('1992-11-08'),
      homeLocationName: 'Avellaneda',
    },
    {
      username: 'ana_perez',
      email: 'ana@example.com',
      password: 'pass1234',
      birthday: new Date('1997-01-30'),
      homeLocationName: 'La Matanza',
    },
    {
      username: 'mike_j',
      email: 'mike@example.com',
      password: 'pass1234',
      birthday: new Date('1994-05-12'),
      homeLocationName: 'Bahía Blanca',
    },
    {
      username: 'lucia_g',
      email: 'lucia@example.com',
      password: 'pass1234',
      birthday: new Date('1999-09-03'),
      homeLocationName: 'Tandil',
    },
    {
      username: 'martin_r',
      email: 'martin@example.com',
      password: 'pass1234',
      birthday: new Date('1993-12-25'),
      homeLocationName: 'Tigre',
    },
    {
      username: 'sofia_k',
      email: 'sofia@example.com',
      password: 'pass1234',
      birthday: new Date('1996-04-17'),
      homeLocationName: 'Quilmes',
    },
    {
      username: 'federico_l',
      email: 'fede@example.com',
      password: 'pass1234',
      birthday: new Date('1991-08-28'),
      homeLocationName: 'Pilar',
    },
    {
      username: 'valentina_m',
      email: 'vale@example.com',
      password: 'pass1234',
      birthday: new Date('2000-02-14'),
      homeLocationName: 'Morón',
    },
    {
      username: 'agustin_p',
      email: 'agustin@example.com',
      password: 'pass1234',
      birthday: new Date('1995-06-10'),
      homeLocationName: 'Campana',
    },
    {
      username: 'camila_t',
      email: 'camila@example.com',
      password: 'pass1234',
      birthday: new Date('1998-10-05'),
      homeLocationName: 'Lanús',
    },
    {
      username: 'diego_h',
      email: 'diego@example.com',
      password: 'pass1234',
      birthday: new Date('1994-03-20'),
      homeLocationName: 'San Isidro',
    },
    {
      username: 'florencia_b',
      email: 'flor@example.com',
      password: 'pass1234',
      birthday: new Date('1997-07-09'),
      homeLocationName: 'Vicente López',
    },
    {
      username: 'nicolas_v',
      email: 'nico@example.com',
      password: 'pass1234',
      birthday: new Date('1993-11-01'),
      homeLocationName: 'Berazategui',
    },
  ];

  for (const { homeLocationName, ...userData } of userInfo) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        isVerified: true,
        homeLocation: { connect: { location: homeLocationName } },
      },
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
    { username: 'lucia_g', sports: ['Running', 'Cycling'] },
    { username: 'martin_r', sports: ['Football', 'Swimming'] },
    { username: 'sofia_k', sports: ['Tennis', 'Volleyball'] },
    { username: 'federico_l', sports: ['Cycling', 'Running'] },
    { username: 'valentina_m', sports: ['Basketball', 'Volleyball'] },
    { username: 'agustin_p', sports: ['Football', 'Tennis'] },
    { username: 'camila_t', sports: ['Football', 'Running'] },
    { username: 'diego_h', sports: ['Swimming', 'Cycling'] },
    { username: 'florencia_b', sports: ['Volleyball', 'Running'] },
    { username: 'nicolas_v', sports: ['Basketball', 'Tennis'] },
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
    // john_doe (Football, Running) - 7 posts
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
      username: 'john_doe',
      content: 'Early morning jog through the park, felt amazing',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'Training for the marathon, 15k long run today',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'Great football practice, scored a hat trick',
      sports: ['Football'],
    },
    {
      username: 'john_doe',
      content: 'New running shoes arrived, breaking them in tomorrow',
      sports: ['Running'],
    },
    {
      username: 'john_doe',
      content: 'Sunday league football, we won 3-1!',
      sports: ['Football'],
    },
    // jane_smith (Tennis, Swimming) - 7 posts
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
      username: 'jane_smith',
      content: 'Won my tennis match 6-4, 6-3, feeling great',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'Swimming laps in the outdoor pool, perfect weather',
      sports: ['Swimming'],
    },
    {
      username: 'jane_smith',
      content: 'Backhand is getting better with each practice session',
      sports: ['Tennis'],
    },
    {
      username: 'jane_smith',
      content: 'New personal best in the 100m freestyle',
      sports: ['Swimming'],
    },
    {
      username: 'jane_smith',
      content: 'Mixed doubles tournament this weekend, excited',
      sports: ['Tennis'],
    },
    // carlos_m (Football, Basketball, Cycling) - 7 posts
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
      username: 'carlos_m',
      content: 'Cycling 40km through the countryside, beautiful route',
      sports: ['Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Pickup basketball at the local court, great game tonight',
      sports: ['Basketball'],
    },
    {
      username: 'carlos_m',
      content: 'Football training with the boys, ready for the tournament',
      sports: ['Football'],
    },
    {
      username: 'carlos_m',
      content: 'New bike day! First ride was absolutely incredible',
      sports: ['Cycling'],
    },
    {
      username: 'carlos_m',
      content: 'Three-point shooting practice, made 50 in a row',
      sports: ['Basketball'],
    },
    // ana_perez (Volleyball, Running) - 7 posts
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
      username: 'ana_perez',
      content: 'Spike practice was on point today, hitting hard',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Trail running in the hills, 8k with beautiful views',
      sports: ['Running'],
    },
    {
      username: 'ana_perez',
      content: 'Volleyball team made it to the semifinals!',
      sports: ['Volleyball'],
    },
    {
      username: 'ana_perez',
      content: 'Interval training on the track, 400m repeats',
      sports: ['Running'],
    },
    {
      username: 'ana_perez',
      content: 'Setting practice with the team, chemistry is improving',
      sports: ['Volleyball'],
    },
    // mike_j (Basketball, Cycling) - 7 posts
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
      username: 'mike_j',
      content: 'Hit the gym for basketball drills, working on my crossover',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Group ride with the cycling club, 60km at good pace',
      sports: ['Cycling'],
    },
    {
      username: 'mike_j',
      content: 'Watching the Lakers game, LeBron is unreal tonight',
      sports: ['Basketball'],
    },
    {
      username: 'mike_j',
      content: 'Climbed 800m elevation on the bike today, legs are toast',
      sports: ['Cycling'],
    },
    {
      username: 'mike_j',
      content: 'Free throw practice, 85% accuracy from the line',
      sports: ['Basketball'],
    },
    // lucia_g (Running, Cycling) - 7 posts
    {
      username: 'lucia_g',
      content: 'Sunrise run along the beach, 10k to start the day',
      sports: ['Running'],
    },
    {
      username: 'lucia_g',
      content: 'Cycling through the forest trail, nature at its best',
      sports: ['Cycling'],
    },
    {
      username: 'lucia_g',
      content: 'Half marathon training, 18k long run done',
      sports: ['Running'],
    },
    {
      username: 'lucia_g',
      content: 'Mountain biking on the new trail, so much fun',
      sports: ['Cycling'],
    },
    {
      username: 'lucia_g',
      content: 'Track workout today, 5x1000m intervals improving pace',
      sports: ['Running'],
    },
    {
      username: 'lucia_g',
      content: 'Century ride done, 100 miles on the bike today',
      sports: ['Cycling'],
    },
    {
      username: 'lucia_g',
      content: 'Recovery run with the dog, short and easy pace',
      sports: ['Running'],
    },
    // martin_r (Football, Swimming) - 7 posts
    {
      username: 'martin_r',
      content: 'Tactical training with the team, working on formations',
      sports: ['Football'],
    },
    {
      username: 'martin_r',
      content: 'Swimming drills at the pool, focusing on my technique',
      sports: ['Swimming'],
    },
    {
      username: 'martin_r',
      content: 'Saturday morning football, perfect weather for a match',
      sports: ['Football'],
    },
    {
      username: 'martin_r',
      content: 'Open water swim at the lake, 2km non-stop',
      sports: ['Swimming'],
    },
    {
      username: 'martin_r',
      content: 'Penalty practice after training, need to improve aim',
      sports: ['Football'],
    },
    {
      username: 'martin_r',
      content: 'Swimming with fins today, great leg workout',
      sports: ['Swimming'],
    },
    {
      username: 'martin_r',
      content: 'Football tournament next month, training starts now',
      sports: ['Football'],
    },
    // sofia_k (Tennis, Volleyball) - 7 posts
    {
      username: 'sofia_k',
      content: 'Tennis serve practice, working on my second serve',
      sports: ['Tennis'],
    },
    {
      username: 'sofia_k',
      content: 'Volleyball team practice, defense drills all evening',
      sports: ['Volleyball'],
    },
    {
      username: 'sofia_k',
      content: 'Tennis rally with a friend, 50 shots in a row',
      sports: ['Tennis'],
    },
    {
      username: 'sofia_k',
      content: 'Beach volleyball tournament, sand is tough to play on',
      sports: ['Volleyball'],
    },
    {
      username: 'sofia_k',
      content: 'Forehand technique improvement with the coach today',
      sports: ['Tennis'],
    },
    {
      username: 'sofia_k',
      content: 'Volleyball league match, we won in three sets',
      sports: ['Volleyball'],
    },
    {
      username: 'sofia_k',
      content: 'Tennis tournament next week, feeling confident',
      sports: ['Tennis'],
    },
    // federico_l (Cycling, Running) - 7 posts
    {
      username: 'federico_l',
      content: 'Morning cycling commute, best way to start the day',
      sports: ['Cycling'],
    },
    {
      username: 'federico_l',
      content: 'Easy 5k recovery run, keeping it light today',
      sports: ['Running'],
    },
    {
      username: 'federico_l',
      content: 'Zwift racing indoors, finished in the top 10',
      sports: ['Cycling'],
    },
    {
      username: 'federico_l',
      content: 'Speed work on the track, 200m repeats under 30 seconds',
      sports: ['Running'],
    },
    {
      username: 'federico_l',
      content: 'Bike maintenance day, cleaned and lubed the chain',
      sports: ['Cycling'],
    },
    {
      username: 'federico_l',
      content: 'Trail running in the rain, muddy but totally worth it',
      sports: ['Running'],
    },
    {
      username: 'federico_l',
      content: 'Gran fondo training, 100km ride planned this weekend',
      sports: ['Cycling'],
    },
    // valentina_m (Basketball, Volleyball) - 7 posts
    {
      username: 'valentina_m',
      content: 'Basketball scrimmage today, my team dominated the court',
      sports: ['Basketball'],
    },
    {
      username: 'valentina_m',
      content: 'Volleyball serving practice, jump serve getting consistent',
      sports: ['Volleyball'],
    },
    {
      username: 'valentina_m',
      content: 'Watching the WNBA finals, incredible athleticism',
      sports: ['Basketball'],
    },
    {
      username: 'valentina_m',
      content: 'Volleyball tournament, we took second place overall',
      sports: ['Volleyball'],
    },
    {
      username: 'valentina_m',
      content: 'Dribbling drills until my fingers hurt, worth it',
      sports: ['Basketball'],
    },
    {
      username: 'valentina_m',
      content: 'Block practice at the net, timing is everything',
      sports: ['Volleyball'],
    },
    {
      username: 'valentina_m',
      content: 'Basketball and volleyball back to back, what a day',
      sports: ['Basketball', 'Volleyball'],
    },
    // agustin_p (Football, Tennis) - 6 posts
    {
      username: 'agustin_p',
      content: 'Midfield training, working on passing accuracy',
      sports: ['Football'],
    },
    {
      username: 'agustin_p',
      content: 'Tennis match against a tough opponent, learned a lot',
      sports: ['Tennis'],
    },
    {
      username: 'agustin_p',
      content: 'Scored the winner in the last minute, what a feeling',
      sports: ['Football'],
    },
    {
      username: 'agustin_p',
      content: 'Topspin forehand is becoming my favorite shot',
      sports: ['Tennis'],
    },
    {
      username: 'agustin_p',
      content: 'Defensive drills in football, positioning is key',
      sports: ['Football'],
    },
    {
      username: 'agustin_p',
      content: 'Tennis volley practice at the net, reflexes improving',
      sports: ['Tennis'],
    },
    // camila_t (Football, Running) - 6 posts
    {
      username: 'camila_t',
      content: 'Football practice under the lights, intense session',
      sports: ['Football'],
    },
    {
      username: 'camila_t',
      content: 'Running 10k in under 50 minutes, new personal record',
      sports: ['Running'],
    },
    {
      username: 'camila_t',
      content: 'Team bonding after football practice, great group',
      sports: ['Football'],
    },
    {
      username: 'camila_t',
      content: 'Running with my playlist, motivation at its peak',
      sports: ['Running'],
    },
    {
      username: 'camila_t',
      content: 'Goalkeeper training, saving penalties is an art',
      sports: ['Football'],
    },
    {
      username: 'camila_t',
      content: 'Marathon training, 30k long run this Sunday morning',
      sports: ['Running'],
    },
    // diego_h (Swimming, Cycling) - 6 posts
    {
      username: 'diego_h',
      content: 'Swimming at the club, 2km mixed strokes today',
      sports: ['Swimming'],
    },
    {
      username: 'diego_h',
      content: 'Night cycling through the city streets, peaceful ride',
      sports: ['Cycling'],
    },
    {
      username: 'diego_h',
      content: 'Butterfly stroke practice, toughest stroke by far',
      sports: ['Swimming'],
    },
    {
      username: 'diego_h',
      content: 'Bike fitting session, adjusted my saddle height',
      sports: ['Cycling'],
    },
    {
      username: 'diego_h',
      content: 'Early morning swim, 50 laps in the pool before work',
      sports: ['Swimming'],
    },
    {
      username: 'diego_h',
      content: 'Cycling interval training, 8x4 minute efforts done',
      sports: ['Cycling'],
    },
    // florencia_b (Volleyball, Running) - 6 posts
    {
      username: 'florencia_b',
      content: 'Volleyball practice, working on our rotations',
      sports: ['Volleyball'],
    },
    {
      username: 'florencia_b',
      content: 'Morning run along the river, peaceful and refreshing',
      sports: ['Running'],
    },
    {
      username: 'florencia_b',
      content: 'Tournament preparation, double practice session today',
      sports: ['Volleyball'],
    },
    {
      username: 'florencia_b',
      content: 'Fartlek run, 5k with speed bursts every few minutes',
      sports: ['Running'],
    },
    {
      username: 'florencia_b',
      content: 'Libero training, digging every ball that comes my way',
      sports: ['Volleyball'],
    },
    {
      username: 'florencia_b',
      content: 'Running group session, 8k with pacing partners',
      sports: ['Running'],
    },
    // nicolas_v (Basketball, Tennis) - 6 posts
    {
      username: 'nicolas_v',
      content: 'Basketball pickup games at the park, good competition',
      sports: ['Basketball'],
    },
    {
      username: 'nicolas_v',
      content: 'Tennis match practice, working on footwork speed',
      sports: ['Tennis'],
    },
    {
      username: 'nicolas_v',
      content: 'Post moves practice, skyhook is coming along nicely',
      sports: ['Basketball'],
    },
    {
      username: 'nicolas_v',
      content: 'Crosscourt forehand winners all day, feeling sharp',
      sports: ['Tennis'],
    },
    {
      username: 'nicolas_v',
      content: 'Rebounding drills, boxing out is everything in basketball',
      sports: ['Basketball'],
    },
    {
      username: 'nicolas_v',
      content: 'Tennis serve and volley practice, old school style',
      sports: ['Tennis'],
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

  // --- Events ---
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const eventsData = [
    {
      host: 'john_doe',
      title: 'Sunday Football at Parque Saavedra',
      description:
        'Partido de fútbol 5 en el Parque Saavedra, La Plata. Todos los niveles son bienvenidos, solo traigan agua y ganas de correr.',
      sport: 'Football',
      locationName: 'La Plata',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 7 * day),
      isPrivate: false,
      coverDescription: 'Football match at the park',
      participants: ['carlos_m', 'martin_r', 'agustin_p', 'camila_t'],
      galleryDescriptions: ['Players warming up', 'Goal of the day'],
    },
    {
      host: 'jane_smith',
      title: 'Tennis doubles in Mar del Plata',
      description:
        'Buscamos gente para jugar dobles en el club. Nivel intermedio, cancha de polvo de ladrillo.',
      sport: 'Tennis',
      locationName: 'General Pueyrredón',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 8 * day),
      isPrivate: false,
      coverDescription: 'Tennis court',
      participants: ['sofia_k', 'nicolas_v'],
      galleryDescriptions: ['Court view', 'After match'],
    },
    {
      host: 'carlos_m',
      title: 'Basketball 3x3 Tournament',
      description:
        'Torneo de básquet 3x3 en el polideportivo de Avellaneda. Premio para el equipo ganador.',
      sport: 'Basketball',
      locationName: 'Avellaneda',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 6 * day),
      isPrivate: false,
      coverDescription: 'Basketball tournament poster',
      participants: ['mike_j', 'valentina_m', 'nicolas_v'],
      galleryDescriptions: ['First match', 'Final game'],
    },
    {
      host: 'ana_perez',
      title: 'Volleyball friendly match',
      description:
        'Partido amistoso de vóley en el club de La Matanza. Necesitamos 2 jugadores más para completar los equipos.',
      sport: 'Volleyball',
      locationName: 'La Matanza',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 5 * day),
      isPrivate: true,
      coverDescription: 'Volleyball net',
      participants: [],
      pendingParticipants: ['sofia_k', 'valentina_m', 'florencia_b'],
    },

    {
      host: 'martin_r',
      title: 'Beach football in Tigre',
      description:
        'Fútbol playa en el Parque de la Costa. Vamos a hacer un partido 5vs5, después bajamos algo a la parrilla.',
      sport: 'Football',
      locationName: 'Tigre',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 9 * day),
      isPrivate: false,
      coverDescription: 'Beach football',
      participants: ['john_doe', 'agustin_p', 'camila_t', 'carlos_m'],
      galleryDescriptions: ['Team photo', 'The grill after'],
    },
    {
      host: 'federico_l',
      title: 'Morning cycling through Pilar',
      description:
        'Salida de ciclismo de 40km por los caminos de Pilar. Ritmo tranquilo, ideal para arrancar el finde.',
      sport: 'Cycling',
      locationName: 'Pilar',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 6 * day + 7 * 60 * 60 * 1000), // 7am
      isPrivate: false,
      coverDescription: 'Cycling route',
      participants: ['lucia_g', 'mike_j', 'diego_h'],
      galleryDescriptions: ['Start point', 'Halfway stop'],
    },
    {
      host: 'sofia_k',
      title: 'Tennis singles match',
      description:
        'Busco rival para jugar un partido de singles en Quilmes. Nivel intermedio-avanzado.',
      sport: 'Tennis',
      locationName: 'Quilmes',
      eventType: 'InPerson' as const,
      startingDate: new Date(now + 4 * day + 18 * 60 * 60 * 1000),
      isPrivate: false,
      coverDescription: 'Tennis singles',
      participants: ['nicolas_v'],
      galleryDescriptions: [],
    },
    {
      host: 'john_doe',
      title: '10K Running Challenge - June',
      description:
        'Corré 10km durante el mes. Cada uno registra su progreso con fotos o comentarios. Al final del mes compartimos los resultados.',
      sport: 'Running',
      locationName: null,
      eventType: 'Asynchronous' as const,
      startingDate: new Date(now + 3 * day),
      endingDate: new Date(now + 33 * day),
      isPrivate: false,
      coverDescription: 'Running challenge',
      participants: [
        'lucia_g',
        'ana_perez',
        'federico_l',
        'camila_t',
        'florencia_b',
      ],
      entries: [
        {
          username: 'john_doe',
          content:
            'First run of the challenge: 5km in 28 minutes. Feeling good!',
          daysAgo: 1,
        },
        {
          username: 'lucia_g',
          content: 'Completed 8km today. New personal best pace!',
          daysAgo: 1,
        },
        {
          username: 'ana_perez',
          content: 'Morning run 6km. Beautiful sunrise today.',
          daysAgo: 2,
        },
        {
          username: 'camila_t',
          content: '10km done in 55 minutes. Goal achieved!',
          daysAgo: 0,
        },
        {
          username: 'federico_l',
          content: 'Slow 5km today, recovering from a cold.',
          daysAgo: 3,
        },
      ],
    },
    {
      host: 'mike_j',
      title: '100km Cycling Challenge',
      description:
        'Ciclistas de Bahía Blanca y alrededores: sumemos 100km entre todos durante las próximas dos semanas. Cada uno aporta lo que pueda.',
      sport: 'Cycling',
      locationName: null,
      eventType: 'Asynchronous' as const,
      startingDate: new Date(now + 2 * day),
      endingDate: new Date(now + 16 * day),
      isPrivate: false,
      coverDescription: 'Cycling challenge',
      participants: ['carlos_m', 'lucia_g', 'federico_l', 'diego_h'],
      entries: [
        {
          username: 'mike_j',
          content:
            'Morning ride: 35km along the coast. Strong wind but great views.',
          daysAgo: 1,
        },
        {
          username: 'carlos_m',
          content: '25km after work. Legs are feeling strong!',
          daysAgo: 2,
        },
        {
          username: 'lucia_g',
          content: '15km commute to work and back. Every km counts!',
          daysAgo: 1,
        },
        {
          username: 'diego_h',
          content: '30km ride through San Isidro. Gorgeous day for cycling.',
          daysAgo: 0,
        },
      ],
    },
    {
      host: 'jane_smith',
      title: '5K Swim Challenge',
      description:
        '5 kilómetros acumulados de natación en piscina. Dos semanas para completarlo. Registren sus avances acá.',
      sport: 'Swimming',
      locationName: null,
      eventType: 'Asynchronous' as const,
      startingDate: new Date(now + 4 * day),
      endingDate: new Date(now + 18 * day),
      isPrivate: false,
      coverDescription: 'Swimming challenge',
      participants: ['martin_r', 'diego_h'],
      entries: [
        {
          username: 'jane_smith',
          content:
            '1500m today: 500m crawl, 500m backstroke, 500m breaststroke.',
          daysAgo: 1,
        },
        {
          username: 'martin_r',
          content: '1000m in 25 minutes. Working on my technique.',
          daysAgo: 2,
        },
        {
          username: 'diego_h',
          content: '1200m today. Tried the new swimming drills.',
          daysAgo: 0,
        },
      ],
    },
  ];

  for (const eventData of eventsData) {
    const hostId = userMap[eventData.host];
    const sportId = sportMap[eventData.sport];
    const location = eventData.locationName
      ? await prisma.location.findUnique({
          where: { location: eventData.locationName },
        })
      : null;
    const locationId = location?.id ?? null;

    const coverImage = await prisma.image.create({
      data: {
        url: `https://picsum.photos/seed/${eventData.title.replace(/\s+/g, '-').toLowerCase()}/800/600`,
      },
    });

    const event = await prisma.event.create({
      data: {
        hostId,
        title: eventData.title,
        description: eventData.description,
        startingDate: eventData.startingDate,
        endingDate: eventData.endingDate ?? null,
        locationId,
        eventType: eventData.eventType,
        sportId,
        isPrivate: eventData.isPrivate,
      },
    });

    await prisma.imageEvent.create({
      data: {
        eventId: event.id,
        imageId: coverImage.id,
        description: eventData.coverDescription,
      },
    });

    const acceptedParticipants = eventData.participants ?? [];
    for (const username of acceptedParticipants) {
      const userId = userMap[username];
      if (userId) {
        await prisma.eventSignUp.upsert({
          where: { userId_eventId: { userId, eventId: event.id } },
          update: {},
          create: {
            userId,
            eventId: event.id,
            state: 'Accepted',
            joinedAt: new Date(now - Math.random() * 5 * day),
          },
        });
      }
    }

    const pendingUsers = (eventData as any).pendingParticipants ?? [];
    for (const username of pendingUsers) {
      const userId = userMap[username];
      if (userId) {
        await prisma.eventSignUp.upsert({
          where: { userId_eventId: { userId, eventId: event.id } },
          update: {},
          create: {
            userId,
            eventId: event.id,
            state: 'Requested',
          },
        });
      }
    }

    if (eventData.eventType === 'InPerson') {
      const galleryDescs = (eventData as any).galleryDescriptions ?? [];
      for (let i = 0; i < galleryDescs.length; i++) {
        const galleryImage = await prisma.image.create({
          data: {
            url: `https://picsum.photos/seed/${eventData.title.replace(/\s+/g, '-').toLowerCase()}-gallery-${i}/800/600`,
          },
        });
        await prisma.imageEvent.create({
          data: {
            eventId: event.id,
            imageId: galleryImage.id,
            description: galleryDescs[i],
          },
        });
      }
    }

    const entries = (eventData as any).entries ?? [];
    for (const entry of entries) {
      const userId = userMap[entry.username];
      if (userId) {
        await prisma.eventEntry.create({
          data: {
            userId,
            eventId: event.id,
            content: entry.content,
            createdAt: new Date(now - entry.daysAgo * day),
          },
        });
      }
    }
  }

  console.log(`✅ ${eventsData.length} events seeded`);
  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
