import { IsOptional, IsString } from 'class-validator';

/**
 * DTO for updating an existing category.
 * Only the fields that need to be updated should be passed.
 */
export class UpdateCategoryDTO {
  /**
   * Optional name of the category.
   * If provided, it must be a non-empty string.
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * Optional description for the category.
   * Can be a string if provided.
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Optional merchant_id if the merchant is changing.
   * Can be an integer if provided.
   */
  @IsOptional()
  merchant_id?: number;
}
