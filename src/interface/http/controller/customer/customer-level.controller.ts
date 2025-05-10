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
import { Prisma } from 'prisma/generated/prisma';
import { CustomerLevelService } from 'src/app/service';

/**
 * Controller for handling HTTP routes for Customer Levels.
 */
@Controller('customer-levels')
export class CustomerLevelController {
  constructor(private readonly service: CustomerLevelService) {}

  /**
   * POST /customer-levels
   * Creates a new customer level.
   */
  @Post()
  create(@Body() body: Prisma.CustomerLevelCreateInput) {
    return this.service.create(body);
  }

  /**
   * GET /customer-levels
   * Retrieves all customer levels.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * GET /customer-levels/:id
   * Gets a specific customer level by ID.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /**
   * PATCH /customer-levels/:id
   * Updates a customer level.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Prisma.CustomerLevelUpdateInput,
  ) {
    return this.service.update(id, body);
  }

  /**
   * DELETE /customer-levels/:id
   * Deletes a customer level.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
