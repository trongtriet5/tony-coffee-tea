import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const connectionString = (process.env.DATABASE_URL || 'mysql://root:trongtriet5@localhost:3306/ipos').replace(/^mysql:\/\//, 'mariadb://');
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const branches = await prisma.branch.findMany();
  console.log("Branches:", branches);

  const b1 = branches.find(b => b.name.includes("chi nhánh 1"));
  const b2 = branches.find(b => b.name.includes("chi nhánh 2"));

  if (!b1 || !b2) {
    console.error("Could not find branches 1 or 2");
    return;
  }

  console.log(`Branch 1 ID: ${b1.id}`);
  console.log(`Branch 2 ID: ${b2.id}`);

  // Update existing null branch_id tables to Branch 1
  const updated = await prisma.table.updateMany({
    where: { branch_id: null },
    data: { branch_id: b1.id }
  });
  console.log(`Updated ${updated.count} tables to Branch 1`);

  // Create 10 more tables for Branch 2
  const existingB2Tables = await prisma.table.findMany({
    where: { branch_id: b2.id }
  });
  
  const startNum = existingB2Tables.length + 1;
  const newTablesData = Array.from({ length: 10 }, (_, i) => ({
    name: `Bàn ${startNum + i}`,
    branch_id: b2.id,
    area: "Chung",
    status: "AVAILABLE"
  }));

  for (const table of newTablesData) {
    await prisma.table.create({ data: table });
  }
  console.log("Created 10 tables for Branch 2");
}

main().finally(() => prisma.$disconnect());
