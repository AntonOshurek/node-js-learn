import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const now = new Date();
		const timestamp = now.toLocaleString();

		const start = Date.now();
		const { method, originalUrl, hostname, headers } = req;

		res.on('finish', () => {
			const elapsed = Date.now() - start;
			const { statusCode } = res;
			const userAgent = headers['user-agent'] || '';

			console.log(
				chalk.green.bold(`[LOG] `) +
					chalk.black(
						`${chalk.white.bgBlack(timestamp)} ${chalk.bold.yellowBright('New Request')} -`,
					) +
					chalk.green(
						` Method: ${chalk.bold.blue(method)}, URL: ${chalk.bold.blue(originalUrl)}, Host: ${chalk.bold.blue(hostname)}, Status: ${chalk.bold.blue(statusCode)}, Elapsed: ${chalk.bold.blue(elapsed + 'ms')}, User-Agent: ${chalk.bold.blue(userAgent)}`,
					),
			);
		});
		next();
	}
}
