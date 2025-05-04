import { Module } from '@nestjs/common';
import { OrderService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { DiscountRepo, OrderRepo } from 'src/infra/repositories';
import { OrderController } from 'src/interface/http/controller';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, OrderService, OrderRepo, DiscountRepo], // Register service and repository
  exports: [], // Export the service to use in other modules
})
export class OrderModule {}
