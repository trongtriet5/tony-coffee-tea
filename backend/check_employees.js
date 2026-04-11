const { Client } = require('pg');

const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

async function checkData() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query(`SELECT username, role FROM employees`);
    console.log('Employees found:', res.rows.length);
    res.rows.forEach(r => console.log(`- ${r.username} (${r.role})`));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

checkData();
