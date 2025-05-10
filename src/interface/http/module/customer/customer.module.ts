import { Module } from '@nestjs/common';
import { CustomerService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { CustomerRepo } from 'src/infra/repositories/customer/customer.repo';
import { CustomerController } from 'src/interface/http/controller';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepo, PrismaService],
})
export class CustomerModule {}
