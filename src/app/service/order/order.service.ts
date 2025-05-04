import { Injectable, NotFoundException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { OrderRepo } from 'src/infra/repositories';

/**
 * Service for handling order-related operations.
 */
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Helper method to retrieve the current merchant's ID from the CLS context.
   * @returns The merchant_id from the context.
   */
  private getMerchantId(): number {
    const userContext = this.cls.get(CLS_USER_KEY);
    return userContext?.merchant_id;
  }

  /**
   * Creates a new order for the current merchant.
   * @param dto - CreateOrderDTO containing order details.
   * @returns The newly created order.
   */
  create(dto: CreateOrderDTO) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.orderRepo.create({
      ...dto,
      merchant_id, // Attach merchant_id to the order
    });
  }

  /**
   * Fetches all orders for the current merchant.
   * @returns List of orders.
   */
  findAll() {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.orderRepo.findAll({
      merchant_id, // Pass merchant_id to filter orders
    });
  }

  /**
   * Finds an order by its ID and ensures it belongs to the current merchant.
   * @param id - ID of the order.
   * @returns The order with the given ID, or null if not found.
   */
  async findOne(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    const order = await this.orderRepo.findOne({
      id,
      merchant_id, // Pass merchant_id to ensure it belongs to the current merchant
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    return order;
  }

  /**
   * Updates an order's details for the current merchant.
   * @param id - ID of the order to update.
   * @param dto - Updated order data.
   * @returns The updated order.
   */
  update(id: number, dto: UpdateOrderDTO) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.orderRepo.update({ id, merchant_id }, dto);
  }

  /**
   * Deletes an order for the current merchant.
   * @param id - ID of the order to delete.
   * @returns The deleted order.
   */
  remove(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.orderRepo.remove({ id, merchant_id }); // Ensure the order belongs to the current merchant
  }
}
