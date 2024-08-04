import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const now = new Date();
		const timestamp = now.toLocaleString();
		const { method, originalUrl, hostname, headers } = req;

		console.log(
			`
${chalk.green.bold('[LOG] 🚀')} ${chalk.white.bgBlack(timestamp)} ${chalk.bold.yellowBright('New Request')}
${chalk.green('Method:')} ${chalk.blue.bold(method)}
${chalk.green('URL:')} ${chalk.blue.bold(originalUrl)}
${chalk.green('Host:')} ${chalk.blue.bold(hostname)}
${chalk.green('User-Agent:')} ${chalk.blue.bold(headers['user-agent'] || '')}
      `,
		);

		const start = Date.now();

		res.on('finish', () => {
			const elapsed = Date.now() - start;
			const { statusCode } = res;

			console.log(
				`
${chalk.green.bold('[LOG] 🏁')} ${chalk.white.bgBlack(timestamp)} ${chalk.bold.yellowBright('Request Completed')}
${chalk.green('Method:')} ${chalk.blue.bold(method)}
${chalk.green('URL:')} ${chalk.blue.bold(originalUrl)}
${chalk.green('Host:')} ${chalk.blue.bold(hostname)}
${chalk.green('Status:')} ${chalk.blue.bold(statusCode)}
${chalk.green('Elapsed:')} ${chalk.blue.bold(`${elapsed}ms`)}
${chalk.green('User-Agent:')} ${chalk.blue.bold(headers['user-agent'] || '')}
        `,
			);
		});

		next();
	}
}
