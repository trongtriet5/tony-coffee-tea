const { Client } = require('pg');

const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

async function checkTables() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables in database:', res.rows.map(r => r.table_name).join(', '));
  } catch (err) {
    console.error('Error connecting to DB:', err.message);
  } finally {
    await client.end();
  }
}

checkTables();
