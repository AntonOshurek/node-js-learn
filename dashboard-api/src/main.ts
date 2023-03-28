//dependencies
import { Container } from 'inversify';
//components
import { App } from './app';
//filters
import { ExeptionFilter } from './errors/exeption.filter';
//controlers
import { UserController } from './users/users.controller';
//services
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/loger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import 'reflect-metadata';
import { ContainerModule } from 'inversify/lib/container/container_module';
import { interfaces } from 'inversify/lib/interfaces/interfaces';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

//composition root - точка сбора всех зависимостей
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
