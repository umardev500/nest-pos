import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ProductModule } from 'src/interface/http/module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
