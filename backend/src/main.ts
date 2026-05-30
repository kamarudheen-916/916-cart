import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get configuration service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 5000);

  // Enable CORS so the Next.js frontend can connect
  app.enableCors({
    origin: '*', // In production, replace with specific domain e.g., 'http://localhost:3000'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization,x-admin-password',
  });

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enforce validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port);
  console.log(`NestJS application successfully running on: http://localhost:${port}/api`);
}
bootstrap();
