import { PrismaClient } from 'prisma/generated/prisma';
import { merchantData } from './merchant.seeder';

const prisma = new PrismaClient();

// Find merchants by name
const techStore = merchantData.find((m) => m.name === 'TechStore');
const fashionHub = merchantData.find((m) => m.name === 'FashionHub');

// Category seed data using merchantData references
export const categoryData = [
  {
    name: 'Electronics',
    description: 'Devices and gadgets',
    merchant_id: techStore?.id as number,
  },
  {
    name: 'Accessories',
    description: 'Tech accessories',
    merchant_id: techStore?.id as number,
  },
  {
    name: 'Clothing',
    description: 'Fashion apparel',
    merchant_id: fashionHub?.id as number,
  },
  {
    name: 'Footwear',
    description: 'Shoes and sandals',
    merchant_id: fashionHub?.id as number,
  },
];

export default async function seedCategory() {
  try {
    console.log('Seeding category data...');
    await prisma.$transaction(
      categoryData.map((category) =>
        prisma.category.create({ data: category }),
      ),
    );
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}
