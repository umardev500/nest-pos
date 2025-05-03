import { Injectable } from '@nestjs/common';
import { ProductRepo } from 'src/infra/repositories';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  find() {
    return this.productRepo.find();
  }
}
