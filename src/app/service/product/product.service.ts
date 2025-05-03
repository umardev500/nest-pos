import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ProductRepo } from 'src/infra/repositories';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly cls: ClsService,
  ) {}

  find() {
    return this.productRepo.find();
  }
}
