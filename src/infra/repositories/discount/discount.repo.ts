import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { CreateDiscountDTO, UpdateDiscountDTO } from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the discount table in the database.
 * Handles data access for creating, retrieving, updating, and deleting discounts.
 */
@Injectable()
export class DiscountRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new discount.
   * @param dto - Data Transfer Object containing discount details.
   * @returns The created discount record.
   */
  create(dto: CreateDiscountDTO) {
    return this.prisma.discount.create({
      data: dto,
    });
  }

  /**
   * Retrieves all discounts matching the optional filter.
   * @param where - Optional filtering conditions (e.g., by merchant_id or scope).
   * @returns List of matching discount records.
   */
  findAll(where?: Prisma.DiscountWhereInput) {
    return this.prisma.discount.findMany({
      where,
    });
  }

  /**
   * Finds a single discount matching unique conditions (e.g., by ID).
   * @param where - Unique conditions (e.g., id).
   * @returns The matching discount or null.
   */
  findOne(where: Prisma.DiscountWhereUniqueInput) {
    return this.prisma.discount.findUnique({
      where,
    });
  }

  /**
   * Updates a discount matching the given unique condition.
   * @param where - Unique conditions (e.g., id).
   * @param dto - Fields to update in the discount.
   * @returns The updated discount.
   */
  update(where: Prisma.DiscountWhereUniqueInput, dto: UpdateDiscountDTO) {
    return this.prisma.discount.update({
      where,
      data: dto,
    });
  }

  /**
   * Deletes a discount by unique condition (e.g., id).
   * @param where - Unique identifier to delete the discount.
   * @returns The deleted discount record.
   */
  remove(where: Prisma.DiscountWhereUniqueInput) {
    return this.prisma.discount.delete({
      where,
    });
  }
}
