import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

// --- Product Unit DTO ---
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

// --- Product Variant Value DTO ---
export class ProductVariantValueDTO {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsInt()
  @IsNotEmpty()
  variant_type_id: number;
}

// --- Product Variant DTO ---
export class ProductVariantDTO {
  @IsInt()
  unit_id: number;

  @IsInt()
  stock: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'SKU is required for product variant.' })
  sku: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  })
  barcode?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one variant value must be provided.' })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantValueDTO)
  product_variant_values: ProductVariantValueDTO[];
}

// --- Main Create Product DTO ---
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string;

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

  @IsInt()
  @IsNotEmpty({ message: 'Base unit ID is required.' })
  base_unit_id: number;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsInt()
  @IsNotEmpty({ message: 'Merchant ID is required.' })
  merchant_id: number;

  @IsOptional()
  @IsInt()
  discount_id?: number;

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
