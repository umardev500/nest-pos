import { Module } from '@nestjs/common';
import { UnitService } from 'src/app/service/unit/unit.service';
import { PrismaService } from 'src/infra/prisma/prisma.servie';
import { UnitRepo } from 'src/infra/repositories';
import { UnitController } from 'src/interface/http/controller';

/**
 * The module that encapsulates all the unit-related functionality,
 * including the controller, service, and repository.
 */
@Module({
  controllers: [UnitController], // Register the UnitController
  providers: [UnitService, UnitRepo, PrismaService], // Register the UnitService, UnitRepo, and PrismaService
})
export class UnitModule {}
