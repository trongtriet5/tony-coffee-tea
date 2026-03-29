const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

async function main() {
  const connectionString = "postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('--- STARTING ULTRA-FAST BULK SEED (MAR 01 - MAR 29) ---');
    await client.query('TRUNCATE TABLE "order_item_toppings", "order_items", "orders", "vouchers", "products", "toppings", "_OrderVouchers" CASCADE');

    const prList = [
      { n: 'Trà Đào Cam Sả', p: 45000, c: 'TRÀ TRÁI CÂY' }, { n: 'Trà Vải Lài', p: 42000, c: 'TRÀ TRÁI CÂY' },
      { n: 'Trà Sữa Matcha', p: 48000, c: 'TRÀ SỮA' }, { n: 'Trà Sữa Trân Châu', p: 45000, c: 'TRÀ SỮA' },
      { n: 'Cà Phê Sữa', p: 29000, c: 'CÀ PHÊ' }, { n: 'Cà Phê Đen', p: 25000, c: 'CÀ PHÊ' },
      { n: 'Bạc Xỉu', p: 32000, c: 'CÀ PHÊ' }, { n: 'Cà Phê Muối', p: 35000, c: 'CÀ PHÊ' },
      { n: 'Sinh Tố Bơ', p: 55000, c: 'ĐÁ XAY' }, { n: 'Chanh Tuyết', p: 38000, c: 'ĐÁ XAY' },
      { n: 'Nước Ép Cam', p: 40000, c: 'NƯỚC ÉP' }, { n: 'Nước Ép Dưa Hấu', p: 35000, c: 'NƯỚC ÉP' }
    ];
    const products: any[] = [];
    for (const pr of prList) {
      const id = uuidv4();
      await client.query('INSERT INTO "products" (id, name_vi, name_en, price, category, updated_at) VALUES ($1, $2, $3, $4, $5, NOW())', [id, pr.n, pr.n, pr.p, pr.c]);
      products.push({ id, ...pr });
    }

    const tList = [
      { n: 'Trân Châu Đen', p: 5000 }, { n: 'Trân Châu Trắng', p: 5000 },
      { n: 'Kem Béo', p: 10000 }, { n: 'Thạch Nha Đam', p: 5000 }, { n: 'Thạch Trái Cây', p: 5000 }
    ];
    const toppings: any[] = [];
    for (const t of tList) {
      const id = uuidv4();
      await client.query('INSERT INTO "toppings" (id, name, price) VALUES ($1, $2, $3)', [id, t.n, t.p]);
      toppings.push({ id, ...t });
    }

    const vList = [
      { code: 'GIAM10K', amount: 10000 },
      { code: 'GIAM20K', amount: 20000 },
      { code: 'SIEUSALE50', amount: 50000 }
    ];
    const vouchers: any[] = [];
    for (const v of vList) {
      const id = uuidv4();
      await client.query('INSERT INTO "vouchers" (id, voucher_code, employee_id, amount, status, expires_at) VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL \'1 year\')', [id, v.code, 'EMP-SEED', v.amount, 'USED']);
      vouchers.push({ id, ...v });
    }

    // Tạo mảng giờ đầy đủ: 08, 09, ..., 23 (16 khung giờ)
    const HOURS = Array.from({ length: 16 }, (_, i) => 8 + i); // [8, 9, ..., 23]

    for (let day = 1; day <= 29; day++) {
      const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;

      // Tổng số order ngẫu nhiên từ 90 -> 130
      const totalCount = 90 + Math.floor(Math.random() * 41);
      process.stdout.write(`Day ${day}: ${totalCount} orders... `);

      // ── Bước 1: Xây dựng danh sách giờ đảm bảo mỗi khung giờ có ít nhất 1 order ──
      // Mỗi giờ trong 08-23 nhận 1 order "guaranteed", phần còn lại random
      const hourSlots: number[] = [];

      // Guaranteed: 1 order mỗi giờ trong 08-23
      for (const h of HOURS) {
        hourSlots.push(h);
      }

      // Phần còn lại: random trong 08-23
      const remaining = totalCount - HOURS.length;
      for (let r = 0; r < remaining; r++) {
        hourSlots.push(HOURS[Math.floor(Math.random() * HOURS.length)]);
      }

      // Shuffle để thứ tự không bị tuần tự
      for (let s = hourSlots.length - 1; s > 0; s--) {
        const j = Math.floor(Math.random() * (s + 1));
        [hourSlots[s], hourSlots[j]] = [hourSlots[j], hourSlots[s]];
      }

      // ── Bước 2: Tạo orders ──
      const oValues: any[] = []; const oParams: any[] = [];
      const iValues: any[] = []; const iParams: any[] = [];
      const tValues: any[] = []; const tParams: any[] = [];
      const vValues: any[] = []; const vParams: any[] = [];

      for (let i = 0; i < totalCount; i++) {
        const hour = hourSlots[i];
        const min = Math.floor(Math.random() * 60);
        const sec = Math.floor(Math.random() * 60);
        const oDate = new Date(`${dateStr}T${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}+07:00`);

        const oId = uuidv4();
        const oNum = `ORD-${day.toString().padStart(2, '0')}-${i.toString().padStart(3, '0')}`;

        let oTotal = 0;
        const numItems = 1 + Math.floor(Math.random() * 2);
        for (let k = 0; k < numItems; k++) {
          const itemId = uuidv4();
          const p = products[Math.floor(Math.random() * products.length)];
          const qty = 1 + Math.floor(Math.random() * 2);

          let tP = 0;
          if (Math.random() > 0.6) {
            const t = toppings[Math.floor(Math.random() * toppings.length)];
            tP = t.p;
            const tpLen = tParams.length;
            tParams.push(uuidv4(), itemId, t.id, t.n, t.p);
            tValues.push(`($${tpLen + 1}, $${tpLen + 2}, $${tpLen + 3}, $${tpLen + 4}, $${tpLen + 5})`);
          }

          const subt = (p.p + tP) * qty;
          oTotal += subt;

          const ipLen = iParams.length;
          iParams.push(itemId, oId, p.id, qty, p.p, subt);
          iValues.push(`($${ipLen + 1}, $${ipLen + 2}, $${ipLen + 3}, $${ipLen + 4}, $${ipLen + 5}, $${ipLen + 6})`);
        }

        let discount = 0;
        // ~25% chance of applying a voucher
        if (Math.random() > 0.75) {
          const v = vouchers[Math.floor(Math.random() * vouchers.length)];
          discount = v.amount;
          if (discount > oTotal) discount = oTotal;

          const vpLen = vParams.length;
          vParams.push(oId, v.id);
          vValues.push(`($${vpLen + 1}, $${vpLen + 2})`);
        }

        const opLen = oParams.length;
        oParams.push(oId, oNum, oTotal, discount, oTotal - discount, oDate);
        oValues.push(`($${opLen + 1}, $${opLen + 2}, $${opLen + 3}, $${opLen + 4}, $${opLen + 5}, $${opLen + 6})`);
      }

      await client.query(`INSERT INTO "orders" (id, order_number, total_amount, discount_amount, final_amount, created_at) VALUES ${oValues.join(',')}`, oParams);
      await client.query(`INSERT INTO "order_items" (id, order_id, product_id, quantity, unit_price, subtotal) VALUES ${iValues.join(',')}`, iParams);
      if (tValues.length > 0) {
        await client.query(`INSERT INTO "order_item_toppings" (id, order_item_id, topping_id, name, price) VALUES ${tValues.join(',')}`, tParams);
      }
      if (vValues.length > 0) {
        await client.query(`INSERT INTO "_OrderVouchers" ("A", "B") VALUES ${vValues.join(',')}`, vParams);
      }
      console.log('OK');
    }
    console.log('--- ENHANCED BULK SEEDING COMPLETED ---');
  } catch (e) {
    console.error('SEEDING FAILED:', e);
  } finally {
    await client.end();
  }
}
main();