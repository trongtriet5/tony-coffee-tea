import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { nanoid } from 'nanoid';

const connectionString = 'postgresql://postgres.nqzzgrdzlzsxhicmljat:trongtriet5@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';

async function main() {
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('--- SEEDING LARGE VOLUME DATA (MAR 23 - MAR 29) ---');

  // 1. Clear Data
  await prisma.orderItemTopping.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.topping.deleteMany();
  await prisma.product.deleteMany();
  await prisma.voucher.deleteMany();

  // 2. Create Toppings
  const toppings = await Promise.all([
    prisma.topping.create({ data: { name: 'Trân Châu Đen', price: 10000 } }),
    prisma.topping.create({ data: { name: 'Trân Châu Trắng', price: 10000 } }),
    prisma.topping.create({ data: { name: 'Thạch Trái Cây', price: 8000 } }),
    prisma.topping.create({ data: { name: 'Kem Cheese', price: 15000 } }),
    prisma.topping.create({ data: { name: 'Đào Miếng', price: 12000 } }),
    prisma.topping.create({ data: { name: 'Thạch Củ Năng', price: 10000 } }),
  ]);

  // 3. Create Products
  const products = await Promise.all([
    prisma.product.create({ data: { name_vi: 'Cà Phê Sữa Đá', name_en: 'Condensed Milk Coffee', price: 35000, category: 'Cà Phê' } }),
    prisma.product.create({ data: { name_vi: 'Bạc Xỉu', name_en: 'White Coffee', price: 35000, category: 'Cà Phê' } }),
    prisma.product.create({ data: { name_vi: 'Trà Đào Cam Sả', name_en: 'Peach Orange Lemongrass Tea', price: 45000, category: 'Trà' } }),
    prisma.product.create({ data: { name_vi: 'Trà Sữa TTVH', name_en: 'TTVH Milk Tea', price: 40000, category: 'Trà' } }),
    prisma.product.create({ data: { name_vi: 'Sinh Tố Bơ', name_en: 'Avocado Smoothie', price: 55000, category: 'Sinh Tố' } }),
    prisma.product.create({ data: { name_vi: 'Nước Cam Tươi', name_en: 'Fresh Orange Juice', price: 40000, category: 'Nước Ép' } }),
    prisma.product.create({ data: { name_vi: 'Bánh Croissant', name_en: 'Croissant', price: 30000, category: 'Đồ Ăn' } }),
    prisma.product.create({ data: { name_vi: 'Bánh Cheesecake', name_en: 'Cheesecake', price: 45000, category: 'Đồ Ăn' } }),
    prisma.product.create({ data: { name_vi: 'Cà Phê Muối', name_en: 'Salt Coffee', price: 40000, category: 'Cà Phê' } }),
  ]);

  // 4. Create Vouchers
  const voucherData = [
    { code: 'GOLD500', amount: 500000 },
    { code: 'GOLD200', amount: 200000 },
    { code: 'GOLD100', amount: 100000 },
    { code: 'GOLD50', amount: 50000 },
  ];
  
  await Promise.all(
    voucherData.map(v => prisma.voucher.create({ 
      data: { voucher_code: v.code, employee_id: 'ADMIN', amount: v.amount, expires_at: new Date('2026-12-31') } 
    }))
  );

  // 5. Create Sample Orders for last 7 days (23/03 to 29/03)
  const paymentMethods = ['CASH', 'E_WALLET', 'MIXED'];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date('2026-03-29');
    date.setDate(date.getDate() - i);
    const orderCount = Math.floor(Math.random() * 15) + 20; // 20 - 35 orders per day

    console.log(`Generating data for ${date.toDateString()}...`);

    for (let j = 0; j < orderCount; j++) {
      const orderNum = `ORD-MAR${date.getDate().toString().padStart(2,'0')}-${nanoid(4).toUpperCase()}`;
      
      let orderTotal = 0;
      const order = await prisma.order.create({
        data: {
          order_number: orderNum,
          total_amount: 0,
          final_amount: 0,
          payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          created_at: date,
        }
      });

      const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items per order
      for (let k = 0; k < numItems; k++) {
        const prod = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 2) + 1;
        let itemSubtotal = prod.price * qty;

        const orderItem = await prisma.orderItem.create({
          data: {
            order_id: order.id,
            product_id: prod.id, quantity: qty, unit_price: prod.price, subtotal: 0
          }
        });

        if (prod.category !== 'Đồ Ăn') {
           const numToppings = Math.floor(Math.random() * 3);
           for (let l = 0; l < numToppings; l++) {
              const top = toppings[Math.floor(Math.random() * toppings.length)];
              await prisma.orderItemTopping.create({
                data: { order_item_id: orderItem.id, topping_id: top.id, name: top.name, price: top.price }
              });
              itemSubtotal += top.price * qty;
           }
        }
        
        await prisma.orderItem.update({ where: { id: orderItem.id }, data: { subtotal: itemSubtotal } });
        orderTotal += itemSubtotal;
      }

      let discountAmount = 0;
      if (Math.random() < 0.45) { // 45% of orders use voucher
        const v = voucherData[Math.floor(Math.random() * voucherData.length)];
        discountAmount = Math.min(v.amount, orderTotal * 0.9); // Don't discount 100% of order
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          total_amount: orderTotal,
          discount_amount: discountAmount,
          final_amount: orderTotal - discountAmount
        }
      });
    }
  }

  console.log('--- SEEDING COMPLETE: 200+ ORDERS CREATED ---');
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
