import { Injectable, UseInterceptors } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Prisma } from 'prisma/generated/prisma';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { CustomerLevelRepo } from 'src/infra/repositories';
import { UserContextInterceptor } from 'src/interceptor';

/**
 * Service for business logic around Customer Levels.
 */
@Injectable()
@UseInterceptors(UserContextInterceptor)
export class CustomerLevelService {
  constructor(
    private readonly customerLevelRepo: CustomerLevelRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Retrieves the merchant_id from the current request context (CLS).
   * @returns merchant_id
   */
  private getMerchantId(): number {
    const userContext = this.cls.get(CLS_USER_KEY);
    return userContext?.merchant_id;
  }

  /**
   * Creates a new customer level for the current merchant.
   * @param data - Input data to create the level.
   * @returns The created CustomerLevel.
   */
  create(data: Prisma.CustomerLevelCreateInput) {
    const merchant_id = this.getMerchantId();
    return this.customerLevelRepo.create({
      ...data,
      merchant: { connect: { id: merchant_id } },
    });
  }

  /**
   * Lists all customer levels for the current merchant.
   * @returns Array of CustomerLevels.
   */
  findAll() {
    const merchant_id = this.getMerchantId();
    return this.customerLevelRepo.findAll({ merchant_id });
  }

  /**
   * Retrieves a specific customer level by ID and merchant.
   * @param id - The level ID.
   * @returns The CustomerLevel.
   */
  findOne(id: number) {
    const merchant_id = this.getMerchantId();
    return this.customerLevelRepo.findOne({ id, merchant_id });
  }

  /**
   * Updates a customer level.
   * @param id - The level ID.
   * @param data - Update data.
   * @returns The updated CustomerLevel.
   */
  update(id: number, data: Prisma.CustomerLevelUpdateInput) {
    const merchant_id = this.getMerchantId();
    return this.customerLevelRepo.update({ id, merchant_id }, data);
  }

  /**
   * Deletes a customer level.
   * @param id - The level ID.
   * @returns The deleted CustomerLevel.
   */
  remove(id: number) {
    const merchant_id = this.getMerchantId();
    return this.customerLevelRepo.remove({ id, merchant_id });
  }
}
