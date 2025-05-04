import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import {
  CategoryModule,
  OrderModule,
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
    OrderModule,
  ],
  providers: [],
})
export class AppModule {}
