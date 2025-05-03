import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { CategoryRepo } from 'src/infra/repositories';

/**
 * Service for handling category-related operations.
 */
@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Helper method to retrieve the current merchant's ID from the CLS context.
   * @returns The merchant_id from the context.
   */
  private getMerchantId(): number {
    const userContext = this.cls.get(CLS_USER_KEY);
    return userContext?.merchant_id;
  }

  /**
   * Creates a new category for the current merchant.
   * @param dto - CreateCategoryDTO containing category details.
   * @returns The newly created category.
   */
  create(dto: CreateCategoryDTO) {
    return this.categoryRepo.create(dto); // Pass merchant_id to the repo
  }

  /**
   * Fetches all categories for the current merchant.
   * @returns List of categories.
   */
  findAll() {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.categoryRepo.findAll(merchant_id); // Pass merchant_id to the repo
  }

  /**
   * Finds a category by its ID and ensures it belongs to the current merchant.
   * @param id - ID of the category.
   * @returns The category with the given ID, or null if not found.
   */
  findOne(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.categoryRepo.findOne(id, merchant_id); // Pass merchant_id to the repo
  }

  /**
   * Updates a category's details for the current merchant.
   * @param id - ID of the category to update.
   * @param dto - Updated category data.
   * @returns The updated category.
   */
  update(id: number, dto: UpdateCategoryDTO) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.categoryRepo.update(id, merchant_id, dto); // Pass merchant_id to the repo
  }

  /**
   * Deletes a category for the current merchant.
   * @param id - ID of the category to delete.
   * @returns The deleted category.
   */
  remove(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.categoryRepo.remove(id, merchant_id); // Pass merchant_id to the repo
  }
}
