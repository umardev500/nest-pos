import { Injectable, UseInterceptors } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { CustomerRepo } from 'src/infra/repositories/customer/customer.repo';
import { UserContextInterceptor } from 'src/interceptor';

/**
 * Service for handling customer-related operations.
 */
@Injectable()
@UseInterceptors(UserContextInterceptor)
export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepo,
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
   * Creates a new customer for the current merchant.
   * @param dto - CreateCustomerDto containing customer details.
   * @returns The newly created customer.
   */
  create(dto: CreateCustomerDto) {
    const merchant_id = this.getMerchantId();

    return this.customerRepo.create({ ...dto, merchant_id });
  }

  /**
   * Retrieves all customers for the current merchant.
   * @returns An array of customers for the current merchant.
   */
  findAll() {
    const merchant_id = this.getMerchantId();
    return this.customerRepo.findAll({ merchant_id });
  }

  /**
   * Retrieves a specific customer by ID for the current merchant.
   * @param id - The ID of the customer.
   * @returns The customer matching the ID and merchant.
   */
  findOne(id: number) {
    const merchant_id = this.getMerchantId();
    return this.customerRepo.findOne({ id, merchant_id });
  }

  /**
   * Updates a customer for the current merchant.
   * @param id - The ID of the customer to update.
   * @param dto - The updated customer data.
   * @returns The updated customer.
   */
  update(id: number, dto: UpdateCustomerDto) {
    const merchant_id = this.getMerchantId();
    return this.customerRepo.update({ id, merchant_id }, dto);
  }

  /**
   * Deletes a customer for the current merchant.
   * @param id - The ID of the customer to delete.
   * @returns The deleted customer.
   */
  remove(id: number) {
    const merchant_id = this.getMerchantId();
    return this.customerRepo.remove({ id, merchant_id });
  }
}
