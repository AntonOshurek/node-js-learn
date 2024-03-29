//dependencies
import express, { Express } from 'express';
import { Server } from 'http';
//types
import type { ILogger } from './logger/loger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { TYPES } from './types';
import { inject } from 'inversify';
import { json } from 'body-parser';
import 'reflect-metadata';
import type { IConfigService } from './config/config.service.interface';
import type { IExeptionFilter } from './errors/exeption.filter.interface';
import type { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express; //Express - интерфейс описывающий приложение
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());

		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		//фильтр ошибок
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)); //биндим метод catch к функции в this.exeptionFilter
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		this.prismaService.connect();
		this.server = this.app.listen(this.port);

		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
