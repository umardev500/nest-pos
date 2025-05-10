import { Module } from '@nestjs/common';
import { CustomerLevelService } from 'src/app/service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { CustomerLevelRepo } from 'src/infra/repositories';
import { CustomerLevelController } from 'src/interface/http/controller';

/**
 * Module that bundles repository, service, and controller for customer levels.
 */
@Module({
  controllers: [CustomerLevelController],
  providers: [CustomerLevelService, CustomerLevelRepo, PrismaService],
})
export class CustomerLevelModule {}
