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
import { CreateCustomerDto, UpdateCustomerDto } from 'src/app/dto';
import { CustomerService } from 'src/app/service';

/**
 * Controller for managing customers.
 * All endpoints are scoped to the authenticated merchant via CLS context.
 */
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Creates a new customer for the current merchant.
   *
   * @param dto - The customer data from the request body.
   * @returns The created customer record.
   */
  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  /**
   * Retrieves all customers for the current merchant.
   *
   * @returns A list of customer records.
   */
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  /**
   * Retrieves a specific customer by its ID for the current merchant.
   *
   * @param id - The customer ID from the route parameter.
   * @returns The matching customer record.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  /**
   * Updates a specific customer by its ID for the current merchant.
   *
   * @param id - The ID of the customer to update.
   * @param dto - The fields to update.
   * @returns The updated customer record.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, dto);
  }

  /**
   * Deletes a specific customer by its ID for the current merchant.
   *
   * @param id - The ID of the customer to delete.
   * @returns The deleted customer record.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
