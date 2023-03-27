//dependencies
import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/loger.interface';
//services
import type { ExpressReturnType, IControllerRoute } from './route.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Bind - [${route.method}] ${route.path}`); //логируем путь который будем биндить.
			const middleware = route.middlewares?.map((m) => m.execute.bind(m)); // перебираем обработчики и биндим им контекст
			const handler = route.func.bind(this); //биндим функцию hndler из переданного роута в наш класс.
			const pipline = middleware ? [...middleware, handler] : handler; // совмещаем midleware и handler в одном массиве
			this.router[route.method](route.path, pipline); // создаём Router из express основываясь на методе, пути и функции из переданного роута.
		}
	}
}
