import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import {
  CreateProductDTO,
  ProductUnitDTO,
  ProductVariantDTO,
} from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

@Injectable()
export class ProductRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new product along with its related units and variants.
   * @param dto - Data Transfer Object containing product creation details.
   */
  async create(dto: CreateProductDTO) {
    const {
      name,
      description,
      image_url,
      barcode,
      base_unit_id,
      category_id,
      merchant_id,
      discount_id,
      product_units,
      product_variants,
    } = dto;

    return this.prisma.product.create({
      data: {
        name,
        description,
        image_url,
        barcode,
        base_unit_id,
        category_id,
        merchant_id,
        discount_id,
        product_units: {
          create: this.mapProductUnits(product_units),
        },
        product_variants: {
          create: this.mapProductVariants(product_variants),
        },
      },
      include: {
        product_units: true,
        product_variants: true,
      },
    });
  }

  /**
   * Finds products with optional filtering criteria.
   * @param where - Optional Prisma where clause to filter products.
   */
  find(where?: Prisma.ProductWhereInput) {
    return this.fetchProducts(where);
  }

  /**
   * Fetches products from the database, including related units and variants.
   * Used internally by the find method.
   * @param where - Optional filter criteria.
   */
  private fetchProducts(where?: Prisma.ProductWhereInput) {
    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
        base_unit: true,
        discount: true,
        product_units: {
          include: { unit: true },
        },
        product_variants: {
          include: {
            variant_value: true,
            unit: true,
          },
        },
      },
    });
  }

  /**
   * Maps DTOs to the shape required for creating product unit records in Prisma.
   * @param units - Array of product unit DTOs.
   */
  private mapProductUnits(units: ProductUnitDTO[]) {
    return units.map((unit) => ({
      unit_id: unit.unit_id,
      stock: unit.stock,
      price: unit.price,
      conversion_factor: unit.conversion_factor,
      sku: unit.sku,
    }));
  }

  /**
   * Maps DTOs to the shape required for creating product variant records in Prisma.
   * @param variants - Array of product variant DTOs.
   */
  private mapProductVariants(variants: ProductVariantDTO[]) {
    return variants.map((variant) => ({
      unit_id: variant.unit_id,
      variant_value_id: variant.variant_value_id,
      stock: variant.stock,
      price: variant.price,
      sku: variant.sku,
    }));
  }
}
