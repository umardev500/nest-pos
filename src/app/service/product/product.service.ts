import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Prisma } from 'prisma/generated/prisma';
import {
  CreateProductDTO,
  ProductFilterDTO,
  UpdateProductDTO,
} from 'src/app/dto';
import { ProductRepo } from 'src/infra/repositories';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly cls: ClsService,
  ) {}

  /**
   * Finds products based on an optional search string and filter.
   * @param filter - ProductFilterDTO containing the search term and optional filters.
   * @returns A list of filtered products.
   */
  find(filter?: ProductFilterDTO) {
    const where: Prisma.ProductWhereInput = {};

    if (filter?.category_id) {
      where.category_id = Number(filter.category_id);
    }

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
    return this.productRepo.findOne({ id });
  }

  /**
   * Updates an existing product along with its related units and variants.
   * @param id - ID of the product to update.
   * @param dto - Data Transfer Object containing updated product details.
   * @returns The updated product.
   */
  async update(id: number, dto: UpdateProductDTO) {
    return await this.productRepo.update({ id }, dto);
  }

  /**
   * Deletes a product by its ID. Related units and variants will be removed via ON DELETE CASCADE.
   * @param id - ID of the product to delete.
   * @returns The deleted product.
   */
  async remove(id: number) {
    return await this.productRepo.remove({ id });
  }
}
