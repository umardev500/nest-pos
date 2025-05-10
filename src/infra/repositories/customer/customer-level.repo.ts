import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the customer_level table in the database.
 * Isolates Prisma logic from the service layer.
 */
@Injectable()
export class CustomerLevelRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new customer level.
   * @param data - Prisma-compatible customer level data.
   * @returns The created CustomerLevel.
   */
  create(data: Prisma.CustomerLevelCreateInput) {
    return this.prisma.customerLevel.create({ data });
  }

  /**
   * Retrieves all customer levels, optionally filtered.
   * @param where - Optional filter object.
   * @returns Array of CustomerLevels.
   */
  findAll(where?: Prisma.CustomerLevelWhereInput) {
    return this.prisma.customerLevel.findMany({
      where,
    });
  }

  /**
   * Finds a specific customer level by unique fields.
   * @param where - Unique filter (e.g., id).
   * @returns A CustomerLevel or null.
   */
  findOne(where: Prisma.CustomerLevelWhereUniqueInput) {
    return this.prisma.customerLevel.findFirst({ where });
  }

  /**
   * Updates a customer level entry.
   * @param where - Unique identifier for the customer level.
   * @param data - Update data.
   * @returns The updated CustomerLevel.
   */
  update(
    where: Prisma.CustomerLevelWhereUniqueInput,
    data: Prisma.CustomerLevelUpdateInput,
  ) {
    return this.prisma.customerLevel.update({ where, data });
  }

  /**
   * Deletes a customer level.
   * @param where - Unique identifier for deletion.
   * @returns The deleted CustomerLevel.
   */
  remove(where: Prisma.CustomerLevelWhereUniqueInput) {
    return this.prisma.customerLevel.delete({ where });
  }
}
