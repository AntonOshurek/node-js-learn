//dependencies
import { Response, Router } from 'express';
//services
import { LoggerService } from "../logger/logger.service";
import type { IControllerRoute } from "./route.interface";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  };

  get router() {
    return this._router;
  };

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  };

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  };

  public created(res: Response) {
    return res.sendStatus(201);
  };

  protected bindRoutes(routes: IControllerRoute[]) {
    for(const route of routes) {
      this.logger.log(`Bind - [${route.method}] ${route.path}`); //логируем путь который будем биндить.
      const handler = route.func.bind(this); //биндим функцию hndler из переданного роута в наш класс.
      this.router[route.method](route.path, handler); // создаём Router из express основываясь на методе, пути и функции из переданного роута.
    };
  };
};
