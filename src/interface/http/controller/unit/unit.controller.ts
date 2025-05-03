import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUnitDTO, UpdateUnitDTO } from 'src/app/dto';
import { UnitService } from 'src/app/service/unit/unit.service';
import { UserContextInterceptor } from 'src/interceptor';

/**
 * Controller for handling unit-related HTTP requests.
 */
@Controller('units')
@UseInterceptors(UserContextInterceptor)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  /**
   * Creates a new unit for the current merchant.
   * @param dto - The data transfer object containing unit details.
   * @returns The newly created unit.
   */
  @Post()
  async create(@Body() dto: CreateUnitDTO) {
    return this.unitService.create(dto); // Calls the service to create a new unit
  }

  /**
   * Retrieves all units for the current merchant.
   * @returns A list of units belonging to the current merchant.
   */
  @Get()
  async findAll() {
    return this.unitService.findAll(); // Calls the service to fetch all units
  }

  /**
   * Retrieves a specific unit by its ID for the current merchant.
   * @param id - The ID of the unit to fetch.
   * @returns The unit with the given ID.
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.unitService.findOne(id); // Calls the service to find a unit by its ID
  }

  /**
   * Updates an existing unit for the current merchant.
   * @param id - The ID of the unit to update.
   * @param dto - The data transfer object containing the updated unit data.
   * @returns The updated unit.
   */
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUnitDTO) {
    return this.unitService.update(id, dto); // Calls the service to update a unit
  }

  /**
   * Deletes a unit for the current merchant.
   * @param id - The ID of the unit to delete.
   * @returns The deleted unit.
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.unitService.remove(id); // Calls the service to delete a unit
  }
}
