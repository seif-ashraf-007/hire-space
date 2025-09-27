import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Setup Swagger configuration based on the existing swagger-api.yaml
  const config = new DocumentBuilder()
    .setTitle('HireSpace API')
    .setDescription(
      'Workspace booking platform connecting customers with flexible office spaces',
    )
    .setVersion('1.0.0')
    .setContact('HireSpace Support', '', 'api@hirespace.com')
    .setLicense('MIT', '')
    .addServer(
      `http://localhost:${process.env.PORT ?? 8000}/api`,
      'Development server',
    )
    .addServer('https://api.hirespace.com/api', 'Production server')
    .addServer('https://staging-api.hirespace.com/api', 'Staging server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearerAuth',
    )
    .addTag('Authentication', 'User registration and login')
    .addTag('Users', 'User profile management')
    .addTag('Spaces', 'Space management for owners')
    .addTag('Rooms', 'Room search and details')
    .addTag('Bookings', 'Booking management with hold system')
    .addTag('Owner Dashboard', 'Space owner management tools')
    .addTag('Payments', 'Payment processing webhooks')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'HireSpace API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT ?? 8000);

  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 8000}`,
  );
  console.log(
    `Swagger UI is available at: http://localhost:${process.env.PORT ?? 8000}/api`,
  );
}

void bootstrap();
