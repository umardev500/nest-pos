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

  @Get()
  find(@Query() filter: ProductFilterDTO) {
    return this.productService.find(filter);
  }

  // POST request to create a new product
  @Post()
  create(@Body() dto: CreateProductDTO) {
    return this.productService.create(dto);
  }
}
