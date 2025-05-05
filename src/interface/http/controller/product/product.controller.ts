import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateProductDTO,
  ProductFilterDTO,
  UpdateProductDTO,
} from 'src/app/dto';
import { ProductService } from 'src/app/service';
import { UserContextInterceptor } from 'src/interceptor';

@Controller('products')
@UseInterceptors(UserContextInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * GET /products
   * Retrieves a list of products, optionally filtered by a search query.
   *
   * Query Parameters:
   * - search (optional): Filters products by name, unit, or variant value (case-insensitive).
   */
  @Get()
  find(@Query() filter: ProductFilterDTO) {
    return this.productService.find(filter);
  }

  /**
   * GET /products/:id
   * Fetches a single product by its ID.
   *
   * Params:
   * - id: The ID of the product to fetch.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  /**
   * POST /products
   * Creates a new product along with its units and variants.
   *
   * Request Body (CreateProductDTO):
   * - name: string (required)
   * - base_unit_id: number (required)
   * - product_units: array of units (at least 1 required)
   * - product_variants: array of variants (optional but must match structure)
   */
  @Post()
  create(@Body() dto: CreateProductDTO) {
    return this.productService.create(dto);
  }

  /**
   * PUT /products/:id
   * Updates an existing product by its ID along with its related units and variants.
   *
   * Params:
   * - id: The ID of the product to update.
   *
   * Request Body (UpdateProductDTO):
   * - name: string (optional)
   * - description: string (optional)
   * - base_unit_id: number (optional)
   * - product_units: array of updated units (optional)
   * - product_variants: array of updated variants (optional)
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductDTO) {
    return this.productService.update(id, dto);
  }

  /**
   * DELETE /products/:id
   * Deletes a product by its ID. Related units and variants will be removed via ON DELETE CASCADE.
   *
   * Params:
   * - id: The ID of the product to delete.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
