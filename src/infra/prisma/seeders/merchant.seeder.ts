import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

// Example data to seed the merchant table
export const merchantData = [
  {
    id: 1,
    name: 'TechStore',
    email: 'techstore@example.com',
    phone: '1234567890',
    address: '123 Tech Street, Silicon Valley, CA',
  },
  {
    id: 2,
    name: 'FashionHub',
    email: 'fashionhub@example.com',
    phone: '0987654321',
    address: '456 Fashion Ave, New York, NY',
  },
];

export default async function seedMerchant() {
  console.log('Seeding merchant data...');

  await prisma.$transaction(
    merchantData.map(({ id, ...merchant }) =>
      prisma.merchant.create({ data: merchant }),
    ),
  );
}
