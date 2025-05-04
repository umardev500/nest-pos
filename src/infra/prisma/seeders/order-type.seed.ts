import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export default async function seedOrderTypes() {
  const merchantId = 1; // Replace with the actual merchant ID you want to seed for

  const orderTypes = [
    { name: 'DINE_IN', label: 'Dine In', enabled: true },
    { name: 'TAKEAWAY', label: 'Takeaway', enabled: true },
    { name: 'DELIVERY', label: 'Delivery', enabled: true },
  ];

  for (const type of orderTypes) {
    await prisma.orderType.upsert({
      where: {
        name: type.name,
        merchant_id: merchantId, // Use these directly instead of a composite unique field
      },
      update: type,
      create: {
        ...type,
        merchant_id: merchantId,
      },
    });
  }

  console.log('✅ Order types seeded for merchant ID:', merchantId);
  await prisma.$disconnect();
}
