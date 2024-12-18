import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AllExceptionsFilter } from './middleware/exceptionFilter.js';
import { LoggerMiddleware } from './middleware/logger.midleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(new LoggerMiddleware().use);

  await app.listen(3000);
}
bootstrap();
