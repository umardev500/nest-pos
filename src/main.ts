import { NestFactory } from '@nestjs/core';
import { UserContextInterceptor } from 'src/interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(app.get(UserContextInterceptor));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
