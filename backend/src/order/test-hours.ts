import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const rangeStart = new Date();
  rangeStart.setDate(rangeStart.getDate() - 7);
  rangeStart.setHours(0, 0, 0, 0);
  const rangeEnd = new Date();
  const orders = await prisma.order.findMany({
where: { created_at: { gte: rangeStart, lte: rangeEnd } },
select: { created_at: true, items: { select: { quantity: true } } }
  });
  console.log("Total orders:", orders.length);
  orders.slice(0, 10).forEach(o => {
const d = new Date(o.created_at);
console.log(`UTC: ${d.toISOString()} | Local Hour: ${d.getHours()} | Items: ${o.items.length}`);
  });
}
run();
