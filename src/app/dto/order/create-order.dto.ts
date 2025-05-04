import { Type } from 'class-transformer';
import {
  ArrayMinSize,
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

// DTO for creating an Order
export class CreateOrderDTO {
  @IsOptional()
  @IsNotUserInput({
    message: 'Merchant ID should not be provided by the user.',
  })
  @IsInt()
  merchant_id: number; // The ID of the merchant placing the order

  @IsInt()
  order_type_id: number; // The ID of the order type (e.g., DINE_IN, TAKEAWAY)

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus = OrderStatus.PENDING; // Default to PENDING status

  @IsNotUserInput({
    message: 'Total amount should not be provided by the user.',
  })
  @IsOptional()
  @IsNumber()
  total_amount: number; // Total amount after any discounts

  @IsOptional()
  @IsNumber()
  discount_id?: number; // Optional discount ID

  @IsNotUserInput({
    message: 'Discount type should not be provided by the user.',
  })
  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType; // Discount type (PERCENT, FIXED)

  @IsNotUserInput({
    message: 'Discount value should not be provided by the user.',
  })
  @IsNumber()
  @IsOptional()
  discount_value?: number; // Discount value (e.g., 10 for 10%, or 5 for $5 discount)

  @IsNumber()
  @IsOptional()
  down_payment?: number; // Optional down payment

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one order item is required.' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  order_items: CreateOrderItemDTO[]; // List of items in the order, including quantity, product, price

  @IsNotUserInput({
    message: 'Paid at should not be provided by the user.',
  })
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
