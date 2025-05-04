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

// DTO for Product Unit
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

  @IsOptional() // Optional, as barcode can be null
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  }) // Optional length constraint
  barcode?: string;
}

// DTO for Product Variant
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

  @IsOptional() // Optional, as barcode can be null
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  }) // Optional length constraint
  barcode?: string;
}

// DTO for creating a Product
export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional() // Optional, as barcode can be null
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Barcode must be alphanumeric and may include hyphens.',
  })
  @Length(8, 16, {
    message: 'Barcode must be between 8 and 16 characters long.',
  }) // Optional length constraint
  barcode?: string;

  @IsOptional() // Optional, as description and image_url can be null
  @IsString()
  description?: string;

  @IsOptional() // Optional, as image_url can be null
  @IsString()
  image_url?: string;

  @IsInt()
  @IsNotEmpty({ message: 'Base unit ID is required.' })
  base_unit_id: number;

  @IsOptional() // Optional, as category_id can be null
  @IsInt()
  category_id?: number;

  @IsInt()
  @IsNotEmpty({ message: 'Merchant ID is required.' })
  merchant_id: number;

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
