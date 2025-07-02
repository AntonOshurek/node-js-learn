import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {LoggerMiddleware} from "./middleware";
import {ConfigService} from "@nestjs/config";
import helmet from "helmet";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.setGlobalPrefix('api');
  app.enableCors();
  // app.enableCors({
  //   origin: 'https://myfrontend.com',
  //   credentials: true,
  // });
  app.use(new LoggerMiddleware().use)
  app.use(helmet());
  app.use(cookieParser());

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
