//dependencies
import express, { Express } from 'express';
import { Server } from 'http';
//services
import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './users/users.controller';
//types
import type { ILoger } from './logger/loger.interface';

export class App {
  app: Express; //Express - интерфейс описывающий приложение
  server: Server;
  port: number;
  logger: ILoger;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor( logger: ILoger, userController: UserController, exeptionFilter: ExeptionFilter ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  };

  useRoutes() {
    this.app.use('/users', this.userController.router);
  };

  useExeptionFilters() { //фильтр ошибок
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)); //биндим метод catch к функции в this.exeptionFilter
  };

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);

    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  };
};
