import { Module } from '@nestjs/common';
import { ProductModule } from 'src/interface/http/module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
