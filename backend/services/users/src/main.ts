import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { createDocument } from './../swagger/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  SwaggerModule.setup('api/docs', app, createDocument(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
