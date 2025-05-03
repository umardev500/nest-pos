import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the categories table.
 */
@Injectable()
export class CategoryRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new category in the database, ensuring it belongs to a merchant.
   * @param dto - CreateCategoryDTO containing category details.
   * @returns The newly created category.
   */
  create(dto: CreateCategoryDTO) {
    const { name, description, merchant_id } = dto;
    return this.prisma.category.create({
      data: {
        name,
        description,
        merchant_id, // Foreign key from the merchant table
      },
    });
  }

  /**
   * Fetches all categories for a specific merchant.
   * @param merchant_id - ID of the merchant to filter categories by.
   * @returns List of categories for the given merchant.
   */
  findAll(merchant_id: number) {
    return this.prisma.category.findMany({
      where: { merchant_id }, // Filter categories by merchant_id
    });
  }

  /**
   * Finds a category by its ID and merchant ID, ensuring the category belongs to the merchant.
   * @param id - ID of the category.
   * @param merchant_id - ID of the merchant to ensure the category belongs to.
   * @returns The category with the given ID and merchant_id, or null if not found.
   */
  findOne(id: number, merchant_id: number) {
    return this.prisma.category.findFirst({
      where: { id, merchant_id }, // Ensure the category belongs to the merchant
    });
  }

  /**
   * Updates a category's details, ensuring the category belongs to the merchant.
   * @param id - ID of the category to update.
   * @param merchant_id - ID of the merchant to ensure the category belongs to.
   * @param dto - Updated category data.
   * @returns The updated category.
   */
  update(id: number, merchant_id: number, dto: UpdateCategoryDTO) {
    return this.prisma.category.update({
      where: { id, merchant_id }, // Ensure the category belongs to the merchant
      data: dto,
    });
  }

  /**
   * Deletes a category by its ID and merchant ID, ensuring the category belongs to the merchant.
   * @param id - ID of the category to delete.
   * @param merchant_id - ID of the merchant to ensure the category belongs to.
   * @returns The deleted category.
   */
  remove(id: number, merchant_id: number) {
    return this.prisma.category.delete({
      where: { id, merchant_id }, // Ensure the category belongs to the merchant
    });
  }
}
