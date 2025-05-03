import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

@Injectable()
export class ProductRepo {
  constructor(private readonly prisma: PrismaService) {}

  private fetchProducts(where?: Prisma.ProductWhereInput) {
    return this.prisma.product.findMany({ where });
  }

  find(where?: Prisma.ProductWhereInput) {
    return this.fetchProducts(where);
  }
}
