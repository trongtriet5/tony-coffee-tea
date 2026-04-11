import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const connectionString = (process.env.DATABASE_URL || 'mysql://root:trongtriet5@localhost:3306/ipos').replace(/^mysql:\/\//, 'mariadb://');
const adapter = new PrismaMariaDb(connectionString);

const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const branches = await prisma.branch.findMany();
  console.log("Branches:", branches.map(b => b.name));

  const keepNames = [
    "Tony Coffee & Tea chi nhánh 1",
    "Tony Coffee & Tea chi nhánh 2",
    "Tony Coffee & Tea - Chi nhánh 1",
    "Tony Coffee & Tea - Chi nhánh 2",
  ];
  
  const keepIds = branches.filter(b => keepNames.includes(b.name)).map(b => b.id);
  const deleteIds = branches.filter(b => !keepIds.includes(b.id)).map(b => b.id);
  
  if (deleteIds.length > 0) {
    console.log("Deleting branches:", deleteIds);
    await prisma.branch.deleteMany({
      where: { id: { in: deleteIds } }
    });
    console.log("Deleted.");
  } else {
    console.log("Nothing to delete.");
  }
}

main().finally(() => prisma.$disconnect());
