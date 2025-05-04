import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DiscountScope, DiscountType } from 'prisma/generated/prisma';

export class UpdateDiscountDTO {
  @IsOptional()
  @IsEnum(DiscountScope)
  scope?: DiscountScope;

  @IsOptional()
  @IsEnum(DiscountType)
  type?: DiscountType;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
