import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ProductFilterDTO } from 'src/app/dto';
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
}
