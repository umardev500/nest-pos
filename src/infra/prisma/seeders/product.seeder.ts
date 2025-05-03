import { PrismaClient } from 'prisma/generated/prisma';
import {
  CreateProductDTO,
  ProductUnitDTO,
  ProductVariantDTO,
} from 'src/app/dto';
import { unitData } from 'src/infra/prisma/seeders/unit.seeder';
import { variantData } from 'src/infra/prisma/seeders/variant.seeder';

const prisma = new PrismaClient();

async function createProductWithUnitsAndVariants(dto: CreateProductDTO) {
  await prisma.product.create({
    data: {
      name: dto.name,
      base_unit_id: dto.base_unit_id,
      ProductUnit: {
        create: dto.product_units.map((unit: ProductUnitDTO) => ({
          unit_id: unit.unit_id,
          stock: unit.stock,
          price: unit.price,
          conversion_factor: unit.conversion_factor,
        })),
      },
      ProductVariant: {
        create: dto.product_variants.map((variant: ProductVariantDTO) => ({
          unit_id: variant.unit_id,
          variant_value_id: variant.variant_value_id,
          stock: variant.stock,
          price: variant.price,
        })),
      },
    },
    include: {
      ProductUnit: true,
      ProductVariant: true,
    },
  });
}

function buildCheeseBurgerDTO(): CreateProductDTO {
  const pieceUnit = unitData.find((u) => u.name === 'Piece')!;
  const boxUnit = unitData.find((u) => u.name === 'Box')!;

  const beef = variantData
    .find((v) => v.name === 'Flavor')!
    .values.find((v) => v.value === 'Beef')!;

  const chicken = variantData
    .find((v) => v.name === 'Flavor')!
    .values.find((v) => v.value === 'Chicken')!;

  const small = variantData
    .find((v) => v.name === 'Size')!
    .values.find((v) => v.value === 'Small')!;

  const large = variantData
    .find((v) => v.name === 'Size')!
    .values.find((v) => v.value === 'Large')!;

  return {
    name: 'Cheese Burger',
    base_unit_id: pieceUnit.id,
    product_units: [
      {
        unit_id: pieceUnit.id,
        stock: 100,
        price: 5.0,
        conversion_factor: 1,
      },
      {
        unit_id: boxUnit.id,
        stock: 20,
        price: 45.0,
        conversion_factor: 10,
      },
    ],
    product_variants: [
      {
        unit_id: pieceUnit.id,
        variant_value_id: beef.id,
        stock: 50,
        price: 5.5,
      },
      {
        unit_id: pieceUnit.id,
        variant_value_id: chicken.id,
        stock: 50,
        price: 5.2,
      },
      {
        unit_id: boxUnit.id,
        variant_value_id: small.id,
        stock: 10,
        price: 48.0,
      },
      {
        unit_id: boxUnit.id,
        variant_value_id: large.id,
        stock: 10,
        price: 50.0,
      },
    ],
  };
}

export default async function seedProduct() {
  console.log('seeding product...');

  // Call the function
  await createProductWithUnitsAndVariants(buildCheeseBurgerDTO());
}
