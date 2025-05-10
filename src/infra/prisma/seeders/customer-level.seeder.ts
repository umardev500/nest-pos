import { DiscountType, PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export const customerLevelData = [
  {
    id: 1,
    merchant_id: 1,
    name: 'Silver',
    description: 'Entry-level membership',
    discount_type: DiscountType.PERCENT,
    discount: 5.0,
  },
  {
    id: 2,
    merchant_id: 1,
    name: 'Gold',
    description: 'Premium membership with more benefits',
    discount_type: DiscountType.PERCENT,
    discount: 10.0,
  },
  {
    id: 3,
    merchant_id: 1,
    name: 'Platinum',
    description: 'Top-tier membership',
    discount_type: DiscountType.FIXED,
    discount: 50000.0,
  },
];

export default async function seedCustomerLevels() {
  console.log('Seeding customer level data...');

  await prisma.$transaction(
    customerLevelData.map((level) =>
      prisma.customerLevel.create({ data: level }),
    ),
  );
}
