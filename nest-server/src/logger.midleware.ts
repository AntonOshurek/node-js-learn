import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const now = new Date();
		const timestamp = now.toLocaleString();
		console.log(
			chalk.green.bold(`[LOG] `) +
				chalk.black(
					`${chalk.white.bgBlack(timestamp)} ${chalk.bold.yellowBright('New Request')} -`,
				) +
				chalk.green(
					` Method: ${chalk.bold.blue(req.method)}, URL: ${chalk.bold.blue(req.originalUrl)}, Host: ${chalk.bold.blue(req.hostname)}`,
				),
		);
		next();
	}
}
