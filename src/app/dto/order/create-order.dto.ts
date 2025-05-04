import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DiscountType, OrderStatus } from 'prisma/generated/prisma';

// DTO for creating an Order
export class CreateOrderDTO {
  @IsInt()
  merchant_id: number; // The ID of the merchant placing the order

  @IsInt()
  order_type_id: number; // The ID of the order type (e.g., DINE_IN, TAKEAWAY)

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus = OrderStatus.PENDING; // Default to PENDING status

  @IsNumber()
  total_amount: number; // Total amount after any discounts

  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Discount type (PERCENT, FIXED)

  @IsNumber()
  @IsOptional()
  discount_value?: number; // Discount value (e.g., 10 for 10%, or 5 for $5 discount)

  @IsNumber()
  @IsOptional()
  down_payment?: number; // Optional down payment

  @IsArray()
  @IsOptional()
  order_items?: CreateOrderItemDTO[]; // List of items in the order, including quantity, product, price

  @IsDate()
  @IsOptional()
  paid_at?: Date; // If paid, the date of payment
}

// DTO for creating an OrderItem
export class CreateOrderItemDTO {
  @IsInt()
  product_id: number; // ID of the product being ordered

  @IsInt()
  @IsOptional()
  variant_id?: number; // Optional: ID of the product variant (if applicable)

  @IsInt()
  unit_id: number; // ID of the unit (e.g., KG, Litre, Piece, etc.)

  @IsInt()
  quantity: number; // The quantity of the product ordered

  @IsNumber()
  price: number; // Price per item after applying any discount

  @IsNumber()
  subtotal: number; // Price * Quantity, subtotal for the order item

  @IsNumber()
  @IsOptional()
  discount_value?: number; // Optional: Discount applied on this specific item

  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Optional: Discount type (PERCENT, FIXED) applied to the item
}
