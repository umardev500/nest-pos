import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { DiscountType } from 'prisma/generated/prisma';

/**
 * DTO for updating an existing customer level.
 */
export class UpdateCustomerLevelDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

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
