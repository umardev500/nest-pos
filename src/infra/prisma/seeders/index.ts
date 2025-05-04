import console from 'console';
import seedCategory from 'src/infra/prisma/seeders/category.seeder';
import seedDiscounts from 'src/infra/prisma/seeders/discount.seeder';
import seedMerchant from 'src/infra/prisma/seeders/merchant.seeder';
import seedOrderTypes from 'src/infra/prisma/seeders/order-type.seed';
import seedProduct from 'src/infra/prisma/seeders/product.seeder';
import seedUnit from 'src/infra/prisma/seeders/unit.seeder';
import seedVariant from './variant.seeder';

async function main() {
  console.log('🍃 Seeding started');
  await seedMerchant();
  await seedOrderTypes();
  await seedDiscounts();
  await seedCategory();
  await seedUnit();
  await seedVariant();
  await seedProduct();
  console.log('✅ Seeding finished');
}

main().catch(console.error);
