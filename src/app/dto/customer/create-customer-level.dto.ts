import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { DiscountType } from 'prisma/generated/prisma';

/**
 * DTO for creating a new customer level.
 */
export class CreateCustomerLevelDTO {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(DiscountType)
  discount_type?: DiscountType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @IsPositive()
  @Type(() => Number)
  discount?: number;
}
