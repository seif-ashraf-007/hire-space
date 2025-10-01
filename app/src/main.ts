import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const swagger = new DocumentBuilder().setVersion('1.0').build();
  const documentation = SwaggerModule.createDocument(app, swagger);
  // http://localhost:8000/api
  SwaggerModule.setup('api', app, documentation);

  await app.listen(process.env.PORT ?? 8000);
}

void bootstrap();
