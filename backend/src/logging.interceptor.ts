import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(async (response) => {
        const duration = Date.now() - now;
        const statusCode = context.switchToHttp().getResponse().statusCode;

        try {
          await this.prisma.apiLog.create({
            data: {
              method,
              path,
              status: statusCode,
              duration,
              body: request.body || null,
              response: response || null,
            },
          });
        } catch (err) {
          console.error('Failed to save API log:', err);
        }
      }),
    );
  }
}
