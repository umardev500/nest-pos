import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

// DTO for updating Product Unit
export class UpdateProductUnitDTO {
  @IsOptional()
  @IsInt()
  unit_id?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  conversion_factor?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  })
  barcode?: string;
}

// Nested DTO for updating product variant values
export class UpdateProductVariantValueDTO {
  @IsOptional()
  @IsInt()
  variant_value_id?: number;
}

// DTO for updating Product Variant
export class UpdateProductVariantDTO {
  @IsOptional()
  @IsInt()
  unit_id?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  })
  barcode?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantValueDTO)
  product_variant_values?: UpdateProductVariantValueDTO[];
}

// DTO for updating a Product
export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  })
  barcode?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsInt()
  base_unit_id?: number;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsInt()
  merchant_id?: number;

  @IsOptional()
  @IsInt()
  discount_id?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product unit is required.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductUnitDTO)
  product_units?: UpdateProductUnitDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDTO)
  product_variants?: UpdateProductVariantDTO[];
}
