import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO, ProductFilterDTO } from 'src/app/dto';
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
}
