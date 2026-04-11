const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const XLSX = require('xlsx');
const path = require('path');

const connectionString = (process.env.DATABASE_URL || 'mysql://root:trongtriet5@localhost:3306/ipos').replace(/^mysql:\/\//, 'mariadb://');
const adapter = new PrismaMariaDb(connectionString);

const prisma = new PrismaClient({ adapter });

async function main() {
  const filePath = path.join(__dirname, '../menu_pos.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log(`Starting import of ${data.length} items...`);

  for (const item of data) {
    const nameVi = item['Item Name'];
    const category = item['Category'];
    const price = parseFloat(item['Price (VND)']);

    if (!nameVi || isNaN(price)) continue;

    console.log(`Importing: ${nameVi} (${category}) - ${price}`);

    try {
      await prisma.product.create({
        data: {
          name_vi: nameVi,
          name_en: nameVi,
          category: category || 'General',
          available: true,
          variants: {
            create: [
              {
                size: 'M',
                price: price,
              }
            ]
          }
        }
      });
    } catch (err) {
      console.error(`Error importing ${nameVi}:`, err.message);
    }
  }

  console.log('Import finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
