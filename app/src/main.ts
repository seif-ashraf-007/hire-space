import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const swagger = new DocumentBuilder()
    .setTitle('Hire Space API')
    .setDescription('API documentation for Hire Space')
    .addServer('http://localhost:7000', 'Local server')
    .addServer('https://hirespace.blockhaven.net', 'Production server')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .build();
  const documentation = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, documentation);

  await app.listen(process.env.PORT ?? 7000);
}

void bootstrap();
