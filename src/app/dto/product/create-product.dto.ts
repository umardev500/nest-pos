// DTO for creating product units
export interface ProductUnitDTO {
  unit_id: number;
  stock: number;
  price: number;
  conversion_factor: number;
}

// DTO for creating product variants
export interface ProductVariantDTO {
  unit_id: number;
  variant_value_id: number;
  stock: number;
  price: number;
}

// DTO for creating a product
export interface CreateProductDTO {
  name: string;
  base_unit_id: number;
  product_units: ProductUnitDTO[];
  product_variants: ProductVariantDTO[];
}
