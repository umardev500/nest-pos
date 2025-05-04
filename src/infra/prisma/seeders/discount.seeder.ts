import { DiscountType, Prisma, PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export default async function seedDiscounts() {
  const merchant = await prisma.merchant.findFirst();
  if (!merchant) {
    throw new Error('No merchants found. Please seed merchants first.');
  }

  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);

  const discounts: Prisma.DiscountCreateInput[] = [
    {
      merchant: {
        connect: {
          id: merchant.id,
        },
      },
      scope: 'PRODUCT',
      type: DiscountType.PERCENT,
      value: 10,
      start_date: now,
      end_date: nextMonth,
    },
    {
      merchant: {
        connect: {
          id: merchant.id,
        },
      },
      scope: 'PRODUCT',
      type: DiscountType.FIXED,
      value: 5000,
      start_date: now,
      end_date: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days
    },
  ];

  for (const discount of discounts) {
    await prisma.discount.create({ data: discount });
  }

  console.log(
    `✅ Seeded ${discounts.length} discounts for merchant ID ${merchant.id}`,
  );
}
