import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import {
  CategoryModule,
  ProductModule,
  UnitModule,
} from 'src/interface/http/module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ProductModule,
    CategoryModule,
    UnitModule,
  ],
  providers: [],
})
export class AppModule {}
