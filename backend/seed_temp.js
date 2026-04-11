const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const branch1 = await prisma.branch.upsert({
    where: { name: 'Tony Coffee & Tea - Chi nhánh 1' },
    update: {},
    create: {
      name: 'Tony Coffee & Tea - Chi nhánh 1',
    },
  });

  const branch2 = await prisma.branch.upsert({
    where: { name: 'Tony Coffee & Tea - Chi nhánh 2' },
    update: {},
    create: {
      name: 'Tony Coffee & Tea - Chi nhánh 2',
    },
  });

  const users = [
    {
      username: 'admin',
      password: hashedPassword,
      name: 'Tổng Quản Lý',
      position_name: 'Administrator',
      role: 'ADMIN',
      branch_id: null,
    },
    {
      username: 'manager1',
      password: hashedPassword,
      name: 'Quản Lý CN 1',
      position_name: 'Manager',
      role: 'MANAGER',
      branch_id: branch1.id,
    },
    {
      username: 'manager2',
      password: hashedPassword,
      name: 'Quản Lý CN 2',
      position_name: 'Manager',
      role: 'MANAGER',
      branch_id: branch2.id,
    },
  ];

  for (const u of users) {
    await prisma.employee.upsert({
      where: { username: u.username },
      update: { password: u.password, branch_id: u.branch_id, role: u.role, name: u.name },
      create: u,
    });
  }
  console.log('Seeded users:', users.map(u => u.username).join(', '));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
