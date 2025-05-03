import seedProduct from './product.seeder';

async function main() {
  console.log('🍃 Seeding started');
  await seedProduct();
  console.log('✅ Seeding finished');
}

main().catch(console.error);
