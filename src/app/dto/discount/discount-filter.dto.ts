import { IsEnum, IsOptional } from 'class-validator';
import { DiscountScope } from 'prisma/generated/prisma';

export class FindDiscountFilterDTO {
  @IsOptional()
  @IsEnum(DiscountScope)
  scope?: DiscountScope;
}
