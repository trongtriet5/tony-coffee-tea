import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  async healthCheck() {
    const startTime = Date.now();
    let dbStatus = 'ok';
    
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'error';
    }

    return {
      status: dbStatus === 'ok' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      responseTime: `${Date.now() - startTime}ms`,
    };
  }

  @Get('warmup')
  @ApiOperation({ summary: 'Warmup endpoint to keep function alive' })
  async warmup() {
    const startTime = Date.now();
    
    await this.prisma.$queryRaw`SELECT 1`;
    
    return {
      warmed: true,
      timestamp: new Date().toISOString(),
      initTime: `${Date.now() - startTime}ms`,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  root() {
    return {
      message: 'iPOS API is running',
      docs: '/api/docs',
      health: '/api/health',
      warmup: '/api/warmup',
      version: '1.0.0',
    };
  }
}
