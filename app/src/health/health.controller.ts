import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  findAll() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime().toFixed(0) + ' seconds',
      memoryUsage: {
        rss: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + ' MB',
        heapTotal:
          (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + ' MB',
        heapUsed:
          (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      },
      cpuUsage: {
        user: (process.cpuUsage().user / 1000).toFixed(2) + ' ms',
        system: (process.cpuUsage().system / 1000).toFixed(2) + ' ms',
      },
    };
  }
}
