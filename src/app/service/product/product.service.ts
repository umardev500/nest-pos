import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Prisma } from 'prisma/generated/prisma';
import { CreateProductDTO, ProductFilterDTO } from 'src/app/dto';
import { ProductRepo } from 'src/infra/repositories';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Finds products based on an optional search string.
   * @param filter - ProductFilterDTO containing the search term.
   * @returns List of filtered products.
   */
  find(filter?: ProductFilterDTO) {
    const where: Prisma.ProductWhereInput = {};

    if (filter?.search) {
      where.OR = [{ name: { contains: filter.search } }];
    }

    return this.productRepo.find(where);
  }

  /**
   * Creates a new product along with its related units and variants.
   * @param dto - Data Transfer Object containing product creation details.
   * @returns The newly created product.
   */
  async create(dto: CreateProductDTO) {
    return await this.productRepo.create(dto);
  }

  /**
   * Fetches a single product by its ID.
   * @param id - ID of the product to fetch.
   * @returns The product with the given ID.
   */
  findOne(id: number) {
    return this.productRepo.find({ id });
  }
}
