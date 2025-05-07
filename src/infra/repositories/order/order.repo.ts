import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/app/dto';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

/**
 * Repository for interacting with the order table in the database.
 * Encapsulates data access logic to isolate Prisma from the service layer.
 */
@Injectable()
export class OrderRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new order.
   * @param dto - CreateOrderDTO containing the details of the order.
   * @returns The newly created order.
   */
  create(dto: CreateOrderDTO) {
    return this.prisma.order.create({
      data: {
        ...dto,
        order_items: {
          create: dto.order_items?.map((item) => ({
            ...item,
          })),
        },
      },
      include: {
        order_items: true,
      },
    });
  }

  /**
   * Retrieves all orders, optionally filtered by the provided `where` clause.
   * @param where - Optional filter parameters for retrieving orders.
   * @returns An array of orders matching the filter criteria.
   */
  findAll(where?: Prisma.OrderWhereInput) {
    return this.prisma.order.findMany({
      where, // The where filter is optional. If not provided, it will fetch all orders.
      include: {
        order_type: true,
        order_items: true, // Including related order items in the result
      },
    });
  }

  /**
   * Retrieves an order by its unique properties, such as its ID.
   * @param where - The filtering parameters for retrieving a specific order.
   * @returns The order matching the provided filters or null if not found.
   */
  findOne(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.findFirst({
      where, // The where filter ensures the order matches the criteria
      include: {
        order_type: true,
        order_items: true, // Including related order items in the result
      },
    });
  }

  /**
   * Retrieves order types based on optional filtering criteria.
   * @param where - Optional filter for order types (e.g., by merchant_id or enabled).
   * @returns A list of matching order types.
   */
  getOrderTypes(where?: Prisma.OrderTypeWhereInput) {
    return this.prisma.orderType.findMany({
      where,
      orderBy: {
        name: 'asc', // Optional sorting
      },
    });
  }

  /**
   * Updates an existing order, ensuring it matches the provided `where` filter.
   * @param where - The filter criteria for updating the order (e.g., `id`).
   * @param dto - The updated order data.
   * @returns The updated order.
   */
  update(where: Prisma.OrderWhereUniqueInput, dto: UpdateOrderDTO) {
    return this.prisma.order.update({
      where, // The where filter ensures the order matches the criteria for update
      data: {
        status: dto.status, // Update the status
        discount_value: dto.discount_value, // Update the discount_value
        order_items: dto.order_items
          ? {
              // Update existing order items
              updateMany: dto.order_items.map((item) => ({
                where: {
                  order_id: where.id, // Ensure the order_id is passed correctly
                  product_id: item.product_id, // Match by product_id
                },
                data: {
                  quantity: item.quantity,
                  price: item.price,
                  subtotal: item.subtotal,
                  discount_value: item.discount_value,
                  discount_type: item.discount_type,
                },
              })),
            }
          : undefined, // If no order_items provided, don't change anything
      },
      include: {
        order_items: true,
      },
    });
  }

  /**
   * Deletes an order, ensuring it matches the provided `where` filter.
   * @param where - The filter criteria for deleting the order.
   * @returns The deleted order.
   */
  remove(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({
      where, // The where filter ensures the order matches the criteria for deletion
    });
  }
}
