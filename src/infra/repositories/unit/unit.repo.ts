import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { CreateUnitDTO, UpdateUnitDTO } from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the unit table in the database.
 * Encapsulates data access logic to isolate Prisma from the service layer.
 */
@Injectable()
export class UnitRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new unit.
   * @param dto - CreateUnitDTO containing the name of the unit.
   * @returns The newly created unit.
   */
  create(dto: CreateUnitDTO) {
    return this.prisma.unit.create({
      data: dto,
    });
  }

  /**
   * Retrieves all units, optionally filtered by the provided `where` clause.
   * @param where - Optional filter parameters for retrieving units.
   * @returns An array of units matching the filter criteria.
   */
  findAll(where?: Prisma.UnitWhereInput) {
    return this.prisma.unit.findMany({
      where, // The where filter is optional. If not provided, it will fetch all units.
    });
  }

  /**
   * Retrieves a unit by its unique properties, such as its ID.
   * @param where - The filtering parameters for retrieving a specific unit.
   * @returns The unit matching the provided filters or null if not found.
   */
  findOne(where: Prisma.UnitWhereUniqueInput) {
    return this.prisma.unit.findFirst({
      where, // The where filter ensures the unit matches the criteria
    });
  }

  /**
   * Updates an existing unit, ensuring it matches the provided `where` filter.
   * @param where - The filter criteria for updating the unit (e.g., `id`).
   * @param dto - The updated unit data.
   * @returns The updated unit.
   */
  update(where: Prisma.UnitWhereUniqueInput, dto: UpdateUnitDTO) {
    return this.prisma.unit.update({
      where, // The where filter ensures the unit matches the criteria for update
      data: dto,
    });
  }

  /**
   * Deletes a unit, ensuring it matches the provided `where` filter.
   * @param where - The filter criteria for deleting the unit.
   * @returns The deleted unit.
   */
  remove(where: Prisma.UnitWhereUniqueInput) {
    return this.prisma.unit.delete({
      where, // The where filter ensures the unit matches the criteria for deletion
    });
  }
}
