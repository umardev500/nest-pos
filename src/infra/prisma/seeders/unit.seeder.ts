import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export const unitData = [
  { id: 1, name: 'Piece', merchant_id: 1 },
  { id: 2, name: 'Box', merchant_id: 1 },
];

export default async function seedUnit() {
  console.log('Seeding unit data...');

  await prisma.$transaction(
    unitData.map((unit) => prisma.unit.create({ data: unit })),
  );
}
