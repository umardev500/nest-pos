import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infra/prisma/prisma.servie';

@Injectable()
export class ProductRepo {
  constructor(private readonly prisma: PrismaService) {}

  private fetchProducts(where?: Prisma.ProductWhereInput) {
    return this.prisma.product.findMany({
      where,
      include: {
        base_unit: true,
        product_unit: {
          include: { unit: true },
        },
        product_variant: {
          include: {
            variant_value: true,
            unit: true,
          },
        },
      },
    });
  }

  find(where?: Prisma.ProductWhereInput) {
    return this.fetchProducts(where);
  }
}
