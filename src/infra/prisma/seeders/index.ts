import console from 'console';
import seedUnit from 'src/infra/prisma/seeders/unit.seeder';
import seedVariant from './variant.seeder';
import seedProduct from 'src/infra/prisma/seeders/product.seeder';

async function main() {
  console.log('🍃 Seeding started');
  await seedUnit();
  await seedVariant();
  await seedProduct();
  console.log('✅ Seeding finished');
}

main().catch(console.error);
