const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

async function fixBranches() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to Supabase.');

    // 1. Show all branches
    const all = await client.query(`SELECT id, name, address FROM branches ORDER BY created_at ASC`);
    console.log('\n=== All Branches ===');
    all.rows.forEach(r => console.log(` [${r.id}] ${r.name} -> ${r.address}`));

    // 2. Update the REAL branch (first/oldest one) with correct name & address
    const realBranch1 = all.rows[0]; // oldest = real one used by orders
    console.log(`\nUpdating real branch 1: ${realBranch1.id}`);
    await client.query(`
      UPDATE branches 
      SET name = 'Tony Coffee & Tea chi nhánh 1',
          address = '22B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông',
          phone = '0123456789'
      WHERE id = $1
    `, [realBranch1.id]);

    // 3. Check if there's a second REAL branch (not b2-uuid)
    const realBranches = all.rows.filter(r => r.id !== 'b1-uuid' && r.id !== 'b2-uuid');
    console.log('\nReal branches (non-fake):', realBranches.map(r => r.name));

    let branch2Id;
    if (realBranches.length >= 2) {
      // Already has a second real branch
      branch2Id = realBranches[1].id;
      await client.query(`
        UPDATE branches 
        SET name = 'Tony Coffee & Tea chi nhánh 2',
            address = '44B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông',
            phone = '0987654321'
        WHERE id = $1
      `, [branch2Id]);
      console.log(`Updated real branch 2: ${branch2Id}`);
    } else {
      // Create a proper branch 2
      const ins = await client.query(`
        INSERT INTO branches (name, address, phone) 
        VALUES ('Tony Coffee & Tea chi nhánh 2', '44B Lê Anh Xuân, Thị Trấn Krông Kmar, huyện Krông Bông', '0987654321')
        RETURNING id
      `);
      branch2Id = ins.rows[0].id;
      console.log(`Created new branch 2: ${branch2Id}`);
    }

    // 4. Delete fake branches (b1-uuid, b2-uuid) only if no orders/employees reference them
    const fakeIds = ['b1-uuid', 'b2-uuid'];
    for (const fid of fakeIds) {
      const ordersCount = await client.query(`SELECT COUNT(*) FROM orders WHERE branch_id = $1`, [fid]);
      const empCount = await client.query(`SELECT COUNT(*) FROM employees WHERE branch_id = $1`, [fid]);
      if (parseInt(ordersCount.rows[0].count) === 0 && parseInt(empCount.rows[0].count) === 0) {
        await client.query(`DELETE FROM branches WHERE id = $1`, [fid]);
        console.log(`Deleted fake branch: ${fid}`);
      } else {
        console.log(`Cannot delete fake branch ${fid}: has ${ordersCount.rows[0].count} orders and ${empCount.rows[0].count} employees`);
        // Re-link employees to real branches
        if (fid === 'b1-uuid') {
          await client.query(`UPDATE employees SET branch_id = $1 WHERE branch_id = 'b1-uuid'`, [realBranch1.id]);
          console.log(`Re-linked b1-uuid employees -> ${realBranch1.id}`);
        }
        if (fid === 'b2-uuid') {
          await client.query(`UPDATE employees SET branch_id = $1 WHERE branch_id = 'b2-uuid'`, [branch2Id]);
          console.log(`Re-linked b2-uuid employees -> ${branch2Id}`);
        }
        // Try delete again after re-linking
        const ordersCount2 = await client.query(`SELECT COUNT(*) FROM orders WHERE branch_id = $1`, [fid]);
        if (parseInt(ordersCount2.rows[0].count) === 0) {
          await client.query(`DELETE FROM branches WHERE id = $1`, [fid]);
          console.log(`Deleted fake branch after re-link: ${fid}`);
        }
      }
    }

    // 5. Update employees with correct passwords
    const hashedPassword = await bcrypt.hash('123456', 10);
    await client.query(`
      UPDATE employees SET password = $1, role = 'ADMIN', branch_id = NULL WHERE username = 'admin'
    `, [hashedPassword]);
    await client.query(`
      UPDATE employees SET password = $1, role = 'MANAGER', branch_id = $2 WHERE username = 'manager1'
    `, [hashedPassword, realBranch1.id]);
    await client.query(`
      UPDATE employees SET password = $1, role = 'MANAGER', branch_id = $2 WHERE username = 'manager2'
    `, [hashedPassword, branch2Id]);
    console.log('\nEmployees updated.');

    // 6. Final state
    const final = await client.query(`SELECT id, name, address, phone FROM branches ORDER BY name`);
    console.log('\n=== Final Branches ===');
    final.rows.forEach(r => console.log(` [${r.id}] ${r.name} | ${r.address} | ${r.phone}`));

    const emps = await client.query(`SELECT username, role, branch_id FROM employees ORDER BY role`);
    console.log('\n=== Final Employees ===');
    emps.rows.forEach(r => console.log(` ${r.username} | ${r.role} | branch: ${r.branch_id}`));

    console.log('\nAll done!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

fixBranches();
