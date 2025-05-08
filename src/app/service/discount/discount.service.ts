import { Injectable, NotFoundException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateDiscountDTO, UpdateDiscountDTO } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { DiscountRepo } from 'src/infra/repositories/discount/discount.repo';

/**
 * Service for handling all discount-related business logic.
 * Ensures that operations are scoped to the currently authenticated merchant,
 * supporting a secure multi-tenant architecture.
 */
@Injectable()
export class DiscountService {
  constructor(
    private readonly discountRepo: DiscountRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Retrieves the merchant ID from the CLS (Continuation Local Storage) context.
   * Used to ensure all operations are scoped to the authenticated merchant.
   *
   * @returns The merchant_id of the current user from CLS context.
   */
  private getMerchantId(): number {
    const userContext = this.cls.get(CLS_USER_KEY);
    return userContext?.merchant_id;
  }

  /**
   * Creates a new discount entry associated with the current merchant.
   *
   * Automatically injects the `merchant_id` from the context to prevent cross-merchant access.
   *
   * @param dto - Data Transfer Object containing discount details.
   * @returns The newly created discount record.
   */
  create(dto: CreateDiscountDTO) {
    const merchant_id = this.getMerchantId();
    return this.discountRepo.create({ ...dto, merchant_id });
  }

  /**
   * Retrieves all discount records belonging to the current merchant.
   *
   * Filters discounts based on the `merchant_id` in the CLS context.
   *
   * @returns An array of discounts scoped to the current merchant.
   */
  findAll() {
    const merchant_id = this.getMerchantId();
    return this.discountRepo.findAll({ merchant_id });
  }

  /**
   * Finds a specific discount by its ID, ensuring it belongs to the current merchant.
   *
   * Prevents access to discounts owned by other merchants in a multi-tenant system.
   *
   * @param id - The ID of the discount to retrieve.
   * @returns The matching discount record.
   * @throws NotFoundException if no matching record is found for the current merchant.
   */
  async findOne(id: number) {
    const merchant_id = this.getMerchantId();
    const discount = await this.discountRepo.findOne({ id, merchant_id });
    if (!discount) {
      throw new NotFoundException(`Discount with id ${id} not found`);
    }
    return discount;
  }

  /**
   * Updates an existing discount belonging to the current merchant.
   *
   * First validates the existence and ownership of the discount via `findOne`.
   * Only then proceeds to apply the specified updates from the DTO.
   *
   * @param id - The ID of the discount to update.
   * @param dto - The fields to update (partial data allowed).
   * @returns The updated discount record.
   * @throws NotFoundException if the discount is not found or doesn't belong to the merchant.
   */
  async update(id: number, dto: UpdateDiscountDTO) {
    await this.findOne(id); // Validate existence and ownership
    const merchant_id = this.getMerchantId();
    return this.discountRepo.update({ id, merchant_id }, dto);
  }

  /**
   * Deletes a discount associated with the current merchant.
   *
   * Performs a secure delete operation by validating discount ownership.
   *
   * @param id - The ID of the discount to delete.
   * @returns The deleted discount record.
   * @throws NotFoundException if the discount does not exist or is not owned by the merchant.
   */
  async remove(id: number) {
    await this.findOne(id); // Validate existence and ownership
    const merchant_id = this.getMerchantId();
    return this.discountRepo.remove({ id, merchant_id });
  }
}
