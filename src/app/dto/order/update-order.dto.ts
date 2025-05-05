import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DiscountType, OrderStatus } from 'prisma/generated/prisma';
import { IsNotUserInput } from 'src/validators';
import { CreateOrderItemDTO } from './create-order.dto'; // Import CreateOrderItemDTO if needed

// DTO for updating an Order
export class UpdateOrderDTO {
  @IsNotUserInput({
    message: 'Merchant ID should not be provided by the user.',
  })
  @IsInt()
  @IsOptional()
  merchant_id?: number; // Optional: The ID of the merchant placing the order

  @IsInt()
  @IsOptional()
  order_type_id?: number; // Optional: The ID of the order type (e.g., DINE_IN, TAKEAWAY)

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus; // Optional: The order status (could be PENDING, COMPLETED, etc.)

  @IsNotUserInput({
    message: 'Total amount should not be provided by the user.',
  })
  @IsNumber()
  @IsOptional()
  total_amount?: number; // Optional: Total amount after any discounts

  @IsNotUserInput({
    message: 'Discount value should not be provided by the user.',
  })
  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Optional: Discount type (PERCENT, FIXED)

  @IsNotUserInput({
    message: 'Discount value should not be provided by the user.',
  })
  @IsNumber()
  @IsOptional()
  discount_value?: number; // Optional: Discount value (e.g., 10 for 10%, or 5 for $5 discount)

  @IsNumber()
  @IsOptional()
  down_payment?: number; // Optional: Down payment

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
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
  quantity?: number; // Optional: The quantity of the product ordered

  @IsNumber()
  @IsOptional()
  price?: number; // Optional: Price per item after applying any discount

  @IsNotUserInput({
    message: 'Subtotal should not be provided by the user.',
  })
  @IsNumber()
  @IsOptional()
  subtotal?: number; // Optional: Price * Quantity, subtotal for the order item

  @IsNumber()
  @IsOptional()
  discount_id?: number; // Optional: Discount ID

  @IsNotUserInput({
    message: 'Discount value should not be provided by the user.',
  })
  @IsNumber()
  @IsOptional()
  discount_value?: number; // Optional: Discount applied on this specific item

  @IsNotUserInput({
    message: 'Discount type should not be provided by the user.',
  })
  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Optional: Discount type (PERCENT, FIXED) applied to the item
}
