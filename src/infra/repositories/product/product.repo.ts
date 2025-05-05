import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import {
  CreateProductDTO,
  ProductUnitDTO,
  ProductVariantDTO,
  UpdateProductDTO,
  UpdateProductUnitDTO,
  UpdateProductVariantDTO,
} from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

@Injectable()
export class ProductRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new product along with its related units and variants.
   * @param dto - Data Transfer Object containing product creation details.
   * @returns The newly created product.
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
   * Finds multiple products with optional filtering criteria.
   * @param where - Optional filter criteria to fetch specific products.
   * @returns A list of products that match the filter criteria.
   */
  find(where?: Prisma.ProductWhereInput) {
    return this.fetchProducts(where);
  }

  /**
   * Finds a single product by unique criteria.
   * @param where - The filtering criteria to fetch a specific product.
   * @returns The product matching the filter criteria or null if not found.
   */
  findOne(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({
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
   * Updates an existing product. Replaces related units and variants if provided.
   * @param where - The filter criteria for updating the product (e.g., `id`).
   * @param dto - The updated product data.
   * @returns The updated product.
   */
  async update(where: Prisma.ProductWhereUniqueInput, dto: UpdateProductDTO) {
    const { product_units, product_variants, ...productData } = dto;

    // If product_units or product_variants are being updated, clear them first
    if (product_units || product_variants) {
      await this.prisma.product.update({
        where,
        data: {
          product_units: { deleteMany: {} },
          product_variants: { deleteMany: {} },
        },
      });
    }

    return this.prisma.product.update({
      where,
      data: {
        ...productData,
        product_units: product_units
          ? { create: this.mapProductUnits(product_units as ProductUnitDTO[]) }
          : undefined,
        product_variants: product_variants
          ? {
              create: this.mapProductVariants(
                product_variants as ProductVariantDTO[],
              ),
            }
          : undefined,
      },
      include: {
        product_units: true,
        product_variants: true,
      },
    });
  }

  /**
   * Deletes a product. Related units and variants are removed via ON DELETE CASCADE.
   * @param where - The filter criteria for deleting the product (e.g., `id`).
   * @returns The deleted product.
   */
  remove(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({
      where,
    });
  }

  /**
   * Internal: Fetches products with full relation tree.
   * @param where - Optional filter criteria to fetch specific products.
   * @returns A list of products with their related data.
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
   * Internal: Maps product units for Prisma create.
   * @param units - Array of product unit DTOs.
   * @returns The mapped product unit data.
   */
  private mapProductUnits(units: ProductUnitDTO[] | UpdateProductUnitDTO[]) {
    return units.map((unit) => ({
      unit_id: unit.unit_id,
      stock: unit.stock,
      price: unit.price,
      conversion_factor: unit.conversion_factor,
      sku: unit.sku,
      barcode: unit.barcode,
    }));
  }

  /**
   * Internal: Maps product variants for Prisma create.
   * @param variants - Array of product variant DTOs.
   * @returns The mapped product variant data.
   */
  private mapProductVariants(
    variants: ProductVariantDTO[] | UpdateProductVariantDTO[],
  ) {
    return variants.map((variant) => ({
      unit_id: variant.unit_id,
      variant_value_id: variant.variant_value_id,
      stock: variant.stock,
      price: variant.price,
      sku: variant.sku,
      barcode: variant.barcode,
    }));
  }
}
