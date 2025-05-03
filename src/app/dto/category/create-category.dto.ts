import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO for creating a new category.
 * Validates the incoming data to ensure it meets the required format.
 */
export class CreateCategoryDTO {
  /**
   * Name of the category.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Optional description for the category.
   * Can be a string if provided.
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * ID of the merchant to which this category belongs.
   * It should be an integer (foreign key to the merchant).
   */
  @IsNotEmpty()
  merchant_id: number;
}
