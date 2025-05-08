import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DiscountScope, DiscountType } from 'prisma/generated/prisma';
import { IsNotUserInput } from 'src/validators';

export class CreateDiscountDTO {
  @IsOptional()
  @IsNotUserInput({
    message: 'Merchant ID should not be provided by the user.',
  })
  @IsInt()
  merchant_id: number;

  @IsEnum(DiscountScope)
  scope: DiscountScope;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
