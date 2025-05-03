import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductUnitDTO {
  @IsInt()
  unit_id: number;

  @IsInt()
  stock: number;

  @IsNumber()
  price: number;

  @IsNumber()
  conversion_factor: number;

  @IsString()
  @IsNotEmpty({ message: 'SKU is required for product unit.' })
  sku: string;
}

export class ProductVariantDTO {
  @IsInt()
  unit_id: number;

  @IsInt()
  variant_value_id: number;

  @IsInt()
  stock: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'SKU is required for product variant.' })
  sku: string;
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'Base unit ID is required.' })
  base_unit_id: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product unit is required.' })
  @ValidateNested({ each: true })
  @Type(() => ProductUnitDTO)
  product_units: ProductUnitDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  product_variants: ProductVariantDTO[];
}
