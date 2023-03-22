import { App } from "./app";
//filters
import { ExeptionFilter } from "./errors/exeption.filter";
//controlers
import { UserController } from "./users/users.controller";
//services
import { LoggerService } from "./logger/logger.service";

//composition root - точка сбора всех зависимостей
async function bootstrap() {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger),
  );
  await app.init();
};

bootstrap();
