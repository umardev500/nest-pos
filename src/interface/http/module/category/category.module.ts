import { Module } from '@nestjs/common';
import { CategoryService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { CategoryRepo } from 'src/infra/repositories/category/category.repo';
import { CategoryController } from 'src/interface/http/controller';

@Module({
  controllers: [CategoryController], // Register the controller
  providers: [CategoryService, CategoryRepo, PrismaService], // Register the service and repository
})
export class CategoryModule {}
