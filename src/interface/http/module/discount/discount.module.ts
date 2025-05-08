import { Module } from '@nestjs/common';
import { DiscountService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { DiscountRepo } from 'src/infra/repositories';
import { DiscountController } from 'src/interface/http/controller';

@Module({
  controllers: [DiscountController],
  providers: [PrismaService, DiscountRepo, DiscountService],
})
export class DiscountModule {}
