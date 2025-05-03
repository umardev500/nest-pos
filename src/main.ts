import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'src/filters';
import { UserContextInterceptor } from 'src/interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    }),
  );

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(app.get(UserContextInterceptor));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
