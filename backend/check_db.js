const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
    }
  }
});

async function check() {
  try {
    const count = await prisma.employee.count();
    console.log('Total employees:', count);
    const admins = await prisma.employee.findMany({ where: { role: 'ADMIN' } });
    console.log('Admins:', admins.map(a => a.username));
  } catch (e) {
    console.error('Error checking employees:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
