import { Module } from '@nestjs/common';
import { ProductService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { ProductRepo } from 'src/infra/repositories';
import { ProductController } from 'src/interface/http/controller';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService, ProductRepo],
})
export class ProductModule {}
