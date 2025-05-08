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
    // existing
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'PRODUCT',
      type: DiscountType.PERCENT,
      value: 10,
      label: 'Discount 10%',
      start_date: now,
      end_date: nextMonth,
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'PRODUCT',
      type: DiscountType.FIXED,
      value: 5000,
      label: 'Discount 5000K',
      start_date: now,
      end_date: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
    },

    // ORDER scoped additions
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.PERCENT,
      value: 10,
      label: 'Order Discount 10%',
      start_date: now,
      end_date: nextMonth,
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.PERCENT,
      value: 12,
      label: 'Order Save 12%',
      start_date: now,
      end_date: nextMonth,
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.PERCENT,
      value: 7,
      label: 'Lucky 7% Off Order',
      start_date: now,
      end_date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.FIXED,
      value: 3000,
      label: 'Flat 3K on Order',
      start_date: now,
      end_date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.FIXED,
      value: 4500,
      label: 'Order Treat Rp4500',
      start_date: now,
      end_date: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.FIXED,
      value: 10000,
      label: 'Big Order Discount Rp10K',
      start_date: now,
      end_date: nextMonth,
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.PERCENT,
      value: 20,
      label: 'Mega 20% Order Sale',
      start_date: now,
      end_date: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.FIXED,
      value: 2000,
      label: 'Small Order Bonus Rp2K',
      start_date: now,
      end_date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      merchant: { connect: { id: merchant.id } },
      scope: 'ORDER',
      type: DiscountType.PERCENT,
      value: 25,
      label: 'Limited 25% Order Off',
      start_date: now,
      end_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const discount of discounts) {
    await prisma.discount.create({ data: discount });
  }

  console.log(
    `✅ Seeded ${discounts.length} discounts for merchant ID ${merchant.id}`,
  );
}
