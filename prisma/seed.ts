import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user (will be created when they sign in with Google)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rumered.com' },
    update: {},
    create: {
      email: 'admin@rumered.com',
      name: 'Admin User',
      username: 'admin',
      role: 'ADMIN',
    },
  });

  // Create test user (will be created when they sign in with Google)
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Test User',
      username: 'testuser',
      role: 'USER',
    },
  });

  console.log('Seeded users:', { admin: admin.email, user: user.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });