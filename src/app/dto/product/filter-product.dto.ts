import { IsOptional, IsString } from 'class-validator';

export class ProductFilterDTO {
  @IsOptional()
  @IsString()
  search?: string; // Single search field
}
