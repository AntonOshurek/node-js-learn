//dependencies
import express, { Express } from 'express';
import { Server } from 'http';
//services
import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './users/users.controller';
//types
import type { ILogger } from './logger/loger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { TYPES } from './types';
import { inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express; //Express - интерфейс описывающий приложение
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    ) {
    this.app = express();
    this.port = 8000;
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
