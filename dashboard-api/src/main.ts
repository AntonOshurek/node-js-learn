//dependencies
import { Container } from "inversify";
//components
import { App } from "./app";
//filters
import { ExeptionFilter } from "./errors/exeption.filter";
//controlers
import { UserController } from "./users/users.controller";
//services
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/loger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import 'reflect-metadata';
import { ContainerModule } from "inversify/lib/container/container_module";
import { interfaces } from "inversify/lib/interfaces/interfaces";

//composition root - точка сбора всех зависимостей
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app};
};

export const { app, appContainer } = bootstrap();
