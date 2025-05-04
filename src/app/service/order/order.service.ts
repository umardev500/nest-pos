import { Injectable, NotFoundException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { DiscountRepo, OrderRepo } from 'src/infra/repositories';

/**
 * Service for handling order-related operations.
 */
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepo,
    private readonly discountRepo: DiscountRepo,
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
   * Resolves a discount for the current merchant.
   * @param discount_id - The ID of the discount to resolve.
   * @param merchant_id - The merchant ID to ensure the discount belongs to the correct merchant.
   * @returns The resolved discount.
   * @throws NotFoundException if discount is not found or doesn't belong to the merchant.
   */
  private async resolveDiscount(discount_id: number, merchant_id: number) {
    const discount = await this.discountRepo.findOne({
      id: discount_id,
      merchant_id,
    });
    if (!discount) {
      throw new NotFoundException(
        `Discount (ID: ${discount_id}) not found or does not belong to this merchant.`,
      );
    }
    return discount;
  }

  /**
   * Resolves and applies discount for the order and its items.
   * @param dto - The CreateOrderDTO to apply discounts to.
   * @param merchant_id - The merchant ID to ensure discounts are valid.
   */
  private async applyDiscounts(dto: CreateOrderDTO, merchant_id: number) {
    // Resolve order-level discount if provided
    if (dto.discount_id) {
      const discount = await this.resolveDiscount(dto.discount_id, merchant_id);
      dto.discount_type = discount.type;
      dto.discount_value = discount.value;
    }

    // Resolve and inject discounts for order items
    for (const item of dto.order_items) {
      if (item.discount_id) {
        const discount = await this.resolveDiscount(
          item.discount_id,
          merchant_id,
        );
        item.discount_type = discount.type;
        item.discount_value = discount.value;
      }
    }
  }

  /**
   * Calculates the total amount for the order, including order-level and item-level discounts.
   * @param dto - The CreateOrderDTO containing order items and discounts.
   * @returns The calculated total amount of the order.
   */
  private calculateTotalAmount(dto: CreateOrderDTO): number {
    let totalAmount = 0;

    // Sum up the item prices
    for (const item of dto.order_items) {
      let itemTotal = item.price * item.quantity;

      // Apply item-level discount if any
      if (item.discount_type === 'PERCENT') {
        itemTotal -= (itemTotal * (item.discount_value || 0)) / 100;
      } else if (item.discount_type === 'FIXED') {
        itemTotal -= item.discount_value || 0;
      }

      totalAmount += itemTotal;
    }

    // Apply order-level discount if any
    if (dto.discount_type === 'PERCENT') {
      totalAmount -= (totalAmount * (dto.discount_value || 0)) / 100;
    } else if (dto.discount_type === 'FIXED') {
      totalAmount -= dto.discount_value || 0;
    }

    return totalAmount;
  }

  /**
   * Creates a new order for the current merchant.
   * @param dto - CreateOrderDTO containing order details.
   * @returns The newly created order.
   */
  async create(dto: CreateOrderDTO) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context

    // Apply discounts to the order and its items
    await this.applyDiscounts(dto, merchant_id);

    // Calculate the total amount of the order
    const total_amount = this.calculateTotalAmount(dto);

    dto = {
      ...dto,
      merchant_id,
      total_amount,
    };

    return this.orderRepo.create(dto);
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
