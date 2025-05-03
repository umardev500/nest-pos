import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/app/service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  find() {
    return this.productService.find();
  }
}
