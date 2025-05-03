import console from 'console';
import seedCategory from 'src/infra/prisma/seeders/category.seeder';
import seedMerchant from 'src/infra/prisma/seeders/merchant.seeder';
import seedProduct from 'src/infra/prisma/seeders/product.seeder';
import seedUnit from 'src/infra/prisma/seeders/unit.seeder';
import seedVariant from './variant.seeder';

async function main() {
  console.log('🍃 Seeding started');
  await seedMerchant();
  await seedCategory();
  await seedUnit();
  await seedVariant();
  await seedProduct();
  console.log('✅ Seeding finished');
}

main().catch(console.error);
