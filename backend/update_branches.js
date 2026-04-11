const { Client } = require('pg');

const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

async function updateBranches() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to Supabase.');

    // First, see what branches exist
    const existing = await client.query(`SELECT id, name, address, phone FROM branches`);
    console.log('Existing branches:');
    existing.rows.forEach(r => console.log(` - ${r.id} | ${r.name} | ${r.address}`));

    // Update by name (not by ID) to fix the real records
    const res1 = await client.query(`
      UPDATE branches 
      SET address = '22B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông'
      WHERE name LIKE '%chi nhánh 1%'
      RETURNING id, name, address
    `);
    console.log('Updated CN1:', res1.rows);

    const res2 = await client.query(`
      UPDATE branches 
      SET address = '44B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông'
      WHERE name LIKE '%chi nhánh 2%'
      RETURNING id, name, address
    `);
    console.log('Updated CN2:', res2.rows);

    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

updateBranches();
