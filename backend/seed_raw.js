const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

async function seedRaw() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to Supabase. Seeding...');

    const hashedPassword = await bcrypt.hash('123456', 10);

    // 1. Seed Branches
    await client.query(`
      INSERT INTO branches (id, name, address, phone)
      VALUES 
        ('b1-uuid', 'Tony Coffee & Tea chi nhánh 1', '22B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông', '0123456789'),
        ('b2-uuid', 'Tony Coffee & Tea chi nhánh 2', '44B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Kmar', '0987654321')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, address = EXCLUDED.address, phone = EXCLUDED.phone
    `);

    // Get the IDs (or just use the ones I set if possible, but Prisma models use UUIDs)
    // Actually I can use fixed UUIDs for seeding since they are new.
    
    // 2. Seed Employees
    await client.query(`
      INSERT INTO employees (id, username, password, name, position_name, role, branch_id)
      VALUES
        ('e1-uuid', 'admin', $1, 'Tổng Quản Lý', 'Administrator', 'ADMIN', NULL),
        ('e2-uuid', 'manager1', $1, 'Quản Lý CN 1', 'Manager', 'MANAGER', 'b1-uuid'),
        ('e3-uuid', 'manager2', $1, 'Quản Lý CN 2', 'Manager', 'MANAGER', 'b2-uuid')
      ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, password = EXCLUDED.password, role = EXCLUDED.role, branch_id = EXCLUDED.branch_id
    `, [hashedPassword]);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    await client.end();
  }
}

seedRaw();
