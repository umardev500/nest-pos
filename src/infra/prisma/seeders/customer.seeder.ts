import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export const customerData = [
  {
    id: 1,
    merchant_id: 1,
    level_id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+628123456789',
    address: 'Jl. Sudirman No. 10, Jakarta',
    points: 120,
  },
  {
    id: 2,
    merchant_id: 1,
    level_id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+628987654321',
    address: 'Jl. Thamrin No. 20, Jakarta',
    points: 300,
  },
  {
    id: 3,
    merchant_id: 1,
    level_id: 3,
    name: 'Andi Wijaya',
    email: 'andi@example.com',
    phone: '+6281122334455',
    address: 'Jl. Kemang Raya, Jakarta Selatan',
    points: 500,
  },
  {
    id: 4,
    merchant_id: 1,
    level_id: 1,
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    phone: '+6282233445566',
    address: 'Jl. Casablanca, Jakarta',
    points: 80,
  },
  {
    id: 5,
    merchant_id: 1,
    level_id: 2,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+6283344556677',
    address: 'Jl. Tebet Barat, Jakarta Selatan',
    points: 260,
  },
  {
    id: 6,
    merchant_id: 1,
    level_id: 3,
    name: 'Clara Wijaya',
    email: 'clara@example.com',
    phone: '+6284455667788',
    address: 'Jl. Panglima Polim, Jakarta',
    points: 700,
  },
  {
    id: 7,
    merchant_id: 1,
    level_id: 2,
    name: 'Rahmat Hidayat',
    email: 'rahmat@example.com',
    phone: '+6285566778899',
    address: 'Jl. Lenteng Agung, Jakarta Selatan',
    points: 340,
  },
];

export default async function seedCustomers() {
  console.log('Seeding customer data...');

  await prisma.$transaction(
    customerData.map((customer) => prisma.customer.create({ data: customer })),
  );
}
