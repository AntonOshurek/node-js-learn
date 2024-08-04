import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.use(helmet());
	app.use(cookieParser());

	await app.listen(3000);
}
bootstrap();
