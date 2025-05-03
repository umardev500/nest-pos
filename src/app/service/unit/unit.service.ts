import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CreateUnitDTO, UpdateUnitDTO } from 'src/app/dto';
import { CLS_USER_KEY } from 'src/constants/cls.constants';
import { UnitRepo } from 'src/infra/repositories/unit/unit.repo';

/**
 * Service for handling unit-related operations.
 */
@Injectable()
export class UnitService {
  constructor(
    private readonly unitRepo: UnitRepo,
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
   * Creates a new unit for the current merchant.
   * @param dto - CreateUnitDTO containing unit details.
   * @returns The newly created unit.
   */
  create(dto: CreateUnitDTO) {
    return this.unitRepo.create(dto); // Pass the dto, as the merchant_id will be fetched internally
  }

  /**
   * Retrieves all units for the current merchant.
   * @returns An array of units matching the current merchant.
   */
  findAll() {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.unitRepo.findAll({ merchant_id }); // Pass merchant_id directly to repo
  }

  /**
   * Retrieves a unit by its ID for the current merchant.
   * @param id - The ID of the unit.
   * @returns The unit with the given ID or null if not found.
   */
  findOne(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.unitRepo.findOne({ id, merchant_id }); // Pass the criteria with merchant_id
  }

  /**
   * Updates an existing unit for the current merchant.
   * @param id - The ID of the unit to update.
   * @param dto - The updated unit data.
   * @returns The updated unit.
   */
  update(id: number, dto: UpdateUnitDTO) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.unitRepo.update({ id, merchant_id }, dto); // Pass the update criteria with merchant_id
  }

  /**
   * Deletes a unit for the current merchant.
   * @param id - The ID of the unit to delete.
   * @returns The deleted unit.
   */
  remove(id: number) {
    const merchant_id = this.getMerchantId(); // Get the merchant_id from CLS context
    return this.unitRepo.remove({ id, merchant_id }); // Pass the deletion criteria with merchant_id
  }
}
