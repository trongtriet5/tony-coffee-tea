const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

async function main() {
  const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('--- STARTING CLEAN SEED (24H Coverage) ---');

    // Truncate all tables
    await client.query(`
      TRUNCATE TABLE "employees", "order_item_toppings", "order_items", "orders", "vouchers", 
      "products", "toppings", "tables", "materials", "material_transactions", 
      "product_recipes", "topping_recipes", "_OrderVouchers" CASCADE
    `);

    // 1. Employees
    const empList = [
      { id: 'NV001', name: 'Nguyễn Văn A', pos: 'Staff Official', r: 'STAFF', o: true },
      { id: 'NV002', name: 'Trần Thị B', pos: 'Staff Newcomer', r: 'STAFF', o: false },
      { id: 'QL001', name: 'Phạm Văn C', pos: 'Manager One', r: 'MANAGER', o: true },
      { id: 'GD001', name: 'Lê Hoàng D', pos: 'Head of Dep', r: 'HOD', o: true },
    ];
    for (const emp of empList) {
      await client.query('INSERT INTO "employees" (id, name, position_name, role, is_official) VALUES ($1, $2, $3, $4, $5)', [emp.id, emp.name, emp.pos, emp.r, emp.o]);
    }

    // 2. Materials
    const materialList = [
      { name: 'Sữa đặc Larosee', unit: 'can', cost: 55000, stock: 100 },
      { name: 'Cà phê Hạt Arabica', unit: 'kg', cost: 150000, stock: 50 },
      { name: 'Trân châu đen', unit: 'kg', cost: 35000, stock: 20 },
      { name: 'Trà Oolong', unit: 'kg', cost: 200000, stock: 10 },
    ];
    const materials: any[] = [];
    for (const m of materialList) {
      const id = uuidv4();
      await client.query('INSERT INTO "materials" (id, name, unit, cost_per_unit, stock_current) VALUES ($1, $2, $3, $4, $5)', [id, m.name, m.unit, m.cost, m.stock]);
      materials.push({ id, ...m });
    }

    // 3. Tables
    const tableList = [
      { name: 'T-01', area: 'Indoor' }, { name: 'T-02', area: 'Indoor' }, { name: 'T-03', area: 'Indoor' },
      { name: 'V-01', area: 'VIP' }, { name: 'V-02', area: 'VIP' },
      { name: 'O-01', area: 'Outdoor' }, { name: 'O-02', area: 'Outdoor' }
    ];
    for (const t of tableList) {
      await client.query('INSERT INTO "tables" (id, name, area, status) VALUES ($1, $2, $3, $4)', [uuidv4(), t.name, t.area, 'AVAILABLE']);
    }

    // 4. Products
    const prList = [
      { n: 'Trà Đào Cam Sả', p: 45000, c: 'TRÀ TRÁI CÂY' }, { n: 'Trà Vải Lài', p: 42000, c: 'TRÀ TRÁI CÂY' },
      { n: 'Trà Sữa Matcha', p: 48000, c: 'TRÀ SỮA' }, { n: 'Trà Sữa Trân Châu', p: 45000, c: 'TRÀ SỮA' },
      { n: 'Cà Phê Sữa', p: 29000, c: 'CÀ PHÊ' }, { n: 'Cà Phê Đen', p: 25000, c: 'CÀ PHÊ' }
    ];
    const products: any[] = [];
    for (const pr of prList) {
      const id = uuidv4();
      await client.query('INSERT INTO "products" (id, name_vi, name_en, price, category, updated_at) VALUES ($1, $2, $3, $4, $5, NOW())', [id, pr.n, pr.n, pr.p, pr.c]);
      products.push({ id, ...pr });
    }

    // 5. Toppings
    const tList = [
      { n: 'Trân Châu Đen', p: 5000 }, { n: 'Trân Châu Trắng', p: 5000 }, { n: 'Kem Béo', p: 10000 }
    ];
    const toppings: any[] = [];
    for (const t of tList) {
      const id = uuidv4();
      await client.query('INSERT INTO "toppings" (id, name, price) VALUES ($1, $2, $3)', [id, t.n, t.p]);
      toppings.push({ id, ...t });
    }

    // 6. Orders (Full 24h Coverage)
    const HOURS = Array.from({ length: 24 }, (_, i) => i);

    for (let day = 1; day <= 29; day++) {
      const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
      const totalCount = 100 + Math.floor(Math.random() * 50);
      process.stdout.write(`Day ${day}: ${totalCount} orders... `);

      const hourSlots: any[] = [];
      for (const h of HOURS) { hourSlots.push(h); hourSlots.push(h); } // Min 2 per hour
      const remaining = totalCount - hourSlots.length;
      for (let r = 0; r < remaining; r++) { hourSlots.push(HOURS[Math.floor(Math.random() * HOURS.length)]); }

      // Shuffle
      for (let s = hourSlots.length - 1; s > 0; s--) {
        const j = Math.floor(Math.random() * (s + 1));
        [hourSlots[s], hourSlots[j]] = [hourSlots[j], hourSlots[s]];
      }

      for (let i = 0; i < totalCount; i++) {
        const hour = hourSlots[i];
        const min = Math.floor(Math.random() * 60);
        const isoString = `${dateStr}T${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00+07:00`;
        const oDate = new Date(isoString);

        const oId = uuidv4();
        const oNum = `ORD-${day.toString().padStart(2, '0')}-${i.toString().padStart(3, '0')}`;

        let oTotal = 0;
        const numItems = 1 + Math.floor(Math.random() * 2);
        const pendingItems: any[] = [];

        for (let k = 0; k < numItems; k++) {
          const itemId = uuidv4();
          const p = products[Math.floor(Math.random() * products.length)];
          const qty = 1 + Math.floor(Math.random() * 2);
          const subt = (p.p as number) * qty;
          oTotal += subt;

          pendingItems.push([itemId, oId, p.id, qty, p.p, subt]);
        }

        await client.query('INSERT INTO "orders" (id, order_number, total_amount, discount_amount, final_amount, created_at, status, order_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [oId, oNum, oTotal, 0, oTotal, oDate, 'COMPLETED', 'TAKEAWAY']);

        for (const itemArgs of pendingItems) {
          await client.query('INSERT INTO "order_items" (id, order_id, product_id, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6)', itemArgs);
        }
      }
      console.log('OK');
    }

    console.log('--- DATA SEEDING COMPLETED SUCCESSFULLY ---');
  } catch (e) {
    console.error('SEEDING FAILED:', e);
  } finally {
    await client.end();
  }
}

main();