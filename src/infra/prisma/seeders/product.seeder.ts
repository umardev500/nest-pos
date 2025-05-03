import { PrismaClient } from 'prisma/generated/prisma';

const prisma = new PrismaClient();

export default async function seedProduct() {
  // Create units
  const [pieceUnit, boxUnit] = await prisma.$transaction([
    prisma.unit.create({ data: { name: 'Piece' } }),
    prisma.unit.create({ data: { name: 'Box' } }),
  ]);

  // Create Variant Types and Values
  const flavorType = await prisma.variantType.create({
    data: {
      name: 'Flavor',
      VariantValue: {
        create: [{ value: 'Beef' }, { value: 'Chicken' }],
      },
    },
    include: { VariantValue: true },
  });

  const sizeType = await prisma.variantType.create({
    data: {
      name: 'Size',
      VariantValue: {
        create: [{ value: 'Small' }, { value: 'Large' }],
      },
    },
    include: { VariantValue: true },
  });

  // Create product
  const product = await prisma.product.create({
    data: {
      name: 'Cheese Burger',
      base_unit_id: pieceUnit.id,
      ProductUnit: {
        create: [
          {
            unit_id: pieceUnit.id,
            stock: 100,
            price: 10.0,
            conversion_factor: 1,
          },
          {
            unit_id: boxUnit.id,
            stock: 10,
            price: 100.0,
            conversion_factor: 10,
          },
        ],
      },
      ProductVariant: {
        create: [
          {
            unit_id: pieceUnit.id,
            variant_value_id: flavorType.VariantValue[0].id, // Beef
            stock: 100,
            price: 5.5,
          },
          {
            unit_id: pieceUnit.id,
            variant_value_id: flavorType.VariantValue[1].id, // Chicken
            stock: 100,
            price: 5.2,
          },
          {
            unit_id: boxUnit.id,
            variant_value_id: sizeType.VariantValue[0].id, // Small
            stock: 20,
            price: 44.0,
          },
          {
            unit_id: boxUnit.id,
            variant_value_id: sizeType.VariantValue[1].id, // Large
            stock: 20,
            price: 46.0,
          },
        ],
      },
    },
    include: { ProductUnit: true, ProductVariant: true },
  });

  console.log(product);
}
