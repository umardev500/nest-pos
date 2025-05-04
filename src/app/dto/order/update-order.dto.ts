import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DiscountType, OrderStatus } from 'prisma/generated/prisma';
import { CreateOrderItemDTO } from './create-order.dto'; // Import CreateOrderItemDTO if needed

// DTO for updating an Order
export class UpdateOrderDTO {
  @IsInt()
  @IsOptional()
  merchant_id?: number; // Optional: The ID of the merchant placing the order

  @IsInt()
  @IsOptional()
  order_type_id?: number; // Optional: The ID of the order type (e.g., DINE_IN, TAKEAWAY)

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus; // Optional: The order status (could be PENDING, COMPLETED, etc.)

  @IsNumber()
  @IsOptional()
  total_amount?: number; // Optional: Total amount after any discounts

  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Optional: Discount type (PERCENT, FIXED)

  @IsNumber()
  @IsOptional()
  discount_value?: number; // Optional: Discount value (e.g., 10 for 10%, or 5 for $5 discount)

  @IsNumber()
  @IsOptional()
  down_payment?: number; // Optional: Down payment

  @IsArray()
  @IsOptional()
  order_items?: CreateOrderItemDTO[]; // Optional: List of items in the order, including quantity, product, price

  @IsDate()
  @IsOptional()
  paid_at?: Date; // Optional: If paid, the date of payment
}

// DTO for updating an OrderItem
export class UpdateOrderItemDTO {
  @IsInt()
  @IsOptional()
  product_id?: number; // Optional: ID of the product being ordered

  @IsInt()
  @IsOptional()
  variant_id?: number; // Optional: ID of the product variant (if applicable)

  @IsInt()
  @IsOptional()
  unit_id?: number; // Optional: ID of the unit (e.g., KG, Litre, Piece, etc.)

  @IsInt()
  @IsOptional()
  quantity?: number; // Optional: The quantity of the product ordered

  @IsNumber()
  @IsOptional()
  price?: number; // Optional: Price per item after applying any discount

  @IsNumber()
  @IsOptional()
  subtotal?: number; // Optional: Price * Quantity, subtotal for the order item

  @IsNumber()
  @IsOptional()
  discount_value?: number; // Optional: Discount applied on this specific item

  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Optional: Discount type (PERCENT, FIXED) applied to the item
}
