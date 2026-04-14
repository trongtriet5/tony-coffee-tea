import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

process.env.TZ = 'Asia/Ho_Chi_Minh';

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    const allowedOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : [
          'http://localhost:3000',
          'http://localhost:3002',
          'https://tony-coffee-tea.vercel.app',
          'http://127.0.0.1:3000',
        ];

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('iPOS API')
      .setDescription('iPOS - F&B Point of Sale System API Documentation')
      .setVersion('1.0')
      .addTag('orders', 'Order management endpoints')
      .addTag('products', 'Product management endpoints')
      .addTag('dashboard', 'Dashboard & analytics endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const customOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'iPOS API Documentation',
      customfavIcon: 'https://vercel.com/favicon.ico',
      customjs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      ],
    };

    SwaggerModule.setup('api/docs', app, document, customOptions);

    await app.init();
  }
  return app.getHttpAdapter().getInstance();
}

export default async (req: any, res: any) => {
  const instance = await bootstrap();
  return instance(req, res);
};

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const startLocal = async () => {
    const localApp = await NestFactory.create(AppModule);
    localApp.setGlobalPrefix('api');
    localApp.enableCors();
    const port = process.env.PORT || 3001;
    await localApp.listen(port);
    console.log(`🚀 iPOS Backend running on: http://localhost:${port}/api`);
  };
  startLocal();
}
