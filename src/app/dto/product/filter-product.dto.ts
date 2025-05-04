import { IsOptional, IsString } from 'class-validator';

export class ProductFilterDTO {
  @IsOptional()
  @IsString()
  search?: string; // Single search field

  @IsOptional()
  @IsString()
  category_id?: string;
}
