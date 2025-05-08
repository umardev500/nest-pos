import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDiscountDTO, UpdateDiscountDTO } from 'src/app/dto';
import { DiscountService } from 'src/app/service';

/**
 * Controller for managing discounts.
 * All endpoints are scoped to the authenticated merchant via CLS context.
 */
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  /**
   * Creates a new discount for the current merchant.
   *
   * @param dto - The discount data from the request body.
   * @returns The created discount record.
   */
  @Post()
  create(@Body() dto: CreateDiscountDTO) {
    return this.discountService.create(dto);
  }

  /**
   * Retrieves all discounts for the current merchant.
   *
   * @returns A list of discount records.
   */
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  /**
   * Retrieves a specific discount by its ID for the current merchant.
   *
   * @param id - The discount ID from the route parameter.
   * @returns The matching discount record.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.findOne(id);
  }

  /**
   * Updates a specific discount by its ID for the current merchant.
   *
   * @param id - The ID of the discount to update.
   * @param dto - The fields to update.
   * @returns The updated discount record.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDiscountDTO,
  ) {
    return this.discountService.update(id, dto);
  }

  /**
   * Deletes a specific discount by its ID for the current merchant.
   *
   * @param id - The ID of the discount to delete.
   * @returns The deleted discount record.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.remove(id);
  }
}
