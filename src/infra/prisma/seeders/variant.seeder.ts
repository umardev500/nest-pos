import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export const variantData = [
  {
    name: 'Flavor',
    values: [
      { id: 1, value: 'Beef' },
      { id: 2, value: 'Chicken' },
    ],
  },
  {
    name: 'Size',
    values: [
      { id: 3, value: 'Small' },
      { id: 4, value: 'Large' },
    ],
  },
];

export default async function seedVariant() {
  console.log('Seeding variant data...');

  await prisma.$transaction(
    variantData.map((variant) =>
      prisma.variantType.create({
        data: {
          name: variant.name,
          variant_value: { create: variant.values },
        },
        include: { variant_value: true },
      }),
    ),
  );
}
