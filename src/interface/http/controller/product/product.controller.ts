import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ProductService } from 'src/app/service';
import { UserContextInterceptor } from 'src/interceptor';

@Controller('products')
@UseInterceptors(UserContextInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  find() {
    return this.productService.find();
  }
}
