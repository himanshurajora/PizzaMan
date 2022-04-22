import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // using the validation pipe to validate the request body
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3333);
}
bootstrap();
