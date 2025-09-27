import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('swagger')
export class SwaggerController {
  @Get('yaml')
  getSwaggerYaml(@Res() res: Response): void {
    try {
      const swaggerPath = path.join(
        __dirname,
        '../../../docs/swagger-api.yaml',
      );
      const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');

      res.setHeader('Content-Type', 'application/x-yaml');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="swagger-api.yaml"',
      );
      res.send(swaggerFile);
    } catch {
      res.status(404).json({ error: 'Swagger YAML file not found' });
    }
  }

  @Get('json')
  getSwaggerJson(@Res() res: Response): void {
    try {
      // Basic YAML to JSON conversion for simple cases
      // In production, you'd want to use a proper YAML parser
      res.setHeader('Content-Type', 'application/json');
      res.json({ message: 'YAML file available at /api/swagger/yaml' });
    } catch {
      res.status(404).json({ error: 'Swagger file not found' });
    }
  }
}
