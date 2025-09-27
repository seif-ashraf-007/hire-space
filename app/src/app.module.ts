import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [HealthModule, SwaggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
