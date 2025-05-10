import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the customer table in the database.
 * Encapsulates data access logic to isolate Prisma from the service layer.
 */
@Injectable()
export class CustomerRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new customer.
   * @param dto - CreateCustomerDto containing customer details.
   * @returns The newly created customer.
   */
  create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: dto,
    });
  }

  /**
   * Retrieves all customers, optionally filtered by the provided `where` clause.
   * @param where - Optional filter parameters for retrieving customers.
   * @returns An array of customers matching the filter criteria.
   */
  findAll(where?: Prisma.CustomerWhereInput) {
    return this.prisma.customer.findMany({
      where,
    });
  }

  /**
   * Retrieves a customer by unique identifier (e.g., ID or email).
   * @param where - The filtering parameters for retrieving a specific customer.
   * @returns The customer matching the provided filters or null if not found.
   */
  findOne(where: Prisma.CustomerWhereUniqueInput) {
    return this.prisma.customer.findFirst({
      where,
    });
  }

  /**
   * Updates an existing customer.
   * @param where - The filter criteria for identifying the customer (e.g., ID).
   * @param dto - The updated customer data.
   * @returns The updated customer.
   */
  update(where: Prisma.CustomerWhereUniqueInput, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where,
      data: dto,
    });
  }

  /**
   * Deletes a customer matching the provided filter.
   * @param where - The filter criteria for deleting the customer.
   * @returns The deleted customer.
   */
  remove(where: Prisma.CustomerWhereUniqueInput) {
    return this.prisma.customer.delete({
      where,
    });
  }
}
