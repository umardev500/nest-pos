import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/app/dto';
import { CategoryService } from 'src/app/service/category/category.service';

/**
 * Controller for handling category-related HTTP requests.
 */
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Creates a new category for the current merchant.
   * @param dto - The data for creating a new category.
   * @returns The newly created category.
   */
  @Post()
  create(@Body() dto: CreateCategoryDTO) {
    return this.categoryService.create(dto); // Delegate to the service layer
  }

  /**
   * Fetches all categories for the current merchant.
   * @returns List of categories for the current merchant.
   */
  @Get()
  findAll() {
    return this.categoryService.findAll(); // Delegate to the service layer
  }

  /**
   * Fetches a category by its ID for the current merchant.
   * @param id - The ID of the category to fetch.
   * @returns The category with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id); // Delegate to the service layer
  }

  /**
   * Updates the category with the given ID for the current merchant.
   * @param id - The ID of the category to update.
   * @param dto - The data to update the category with.
   * @returns The updated category.
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDTO) {
    return this.categoryService.update(id, dto); // Delegate to the service layer
  }

  /**
   * Deletes the category with the given ID for the current merchant.
   * @param id - The ID of the category to delete.
   * @returns The deleted category.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id); // Delegate to the service layer
  }
}
