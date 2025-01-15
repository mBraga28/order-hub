import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.order.createMany({
    data: [
      { productName: 'Laptop', price: 1200.00, quantity: 10 },
      { productName: 'Headphones', price: 150.00, quantity: 50 },
      { productName: 'Monitor', price: 300.00, quantity: 15 },
    ],
  });
  console.log('Database seeded!');
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(() => prisma.$disconnect());
