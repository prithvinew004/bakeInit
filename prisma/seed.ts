import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Butter Croissant", price: 800, description: "Flaky croissant", available: true },
      { name: "Chocolate Cake (slice)", price: 1200, description: "Rich chocolate", available: true },
      { name: "Brownie", price: 600, description: "Fudgy brownie", available: true },
      { name: "Baguette", price: 500, description: "Crispy baguette", available: true },
      { name: "Sourdough Loaf", price: 3000, description: "Artisan loaf", available: true }
    ]
  });
  console.log('seeded products');
}
main().catch(console.error).finally(() => process.exit());