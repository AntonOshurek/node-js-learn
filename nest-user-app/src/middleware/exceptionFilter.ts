import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import chalk from 'chalk';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const now = new Date();
		const timestamp = now.toLocaleString();

		let errorResponse: any;
		let errorMessage: string;

		if (exception instanceof HttpException) {
			errorResponse = exception.getResponse();
			errorMessage =
				typeof errorResponse === 'string'
					? errorResponse
					: JSON.stringify(errorResponse);
		} else {
			errorResponse = exception;
			errorMessage = (exception as Error).message || JSON.stringify(exception);
		}

		const logMessage = `
${chalk.red.bold('[ERROR] 👿')} ${chalk.white.bgBlack(timestamp)}
${chalk.red(`Status: ${status}`)}
${chalk.red(`Method: ${request.method}`)}
${chalk.red(`URL: ${request.url}`)}
${chalk.red(`Message: ${errorMessage}`)}
    `;

		console.log(logMessage);

		response.status(status).json({
			statusCode: status,
			timestamp: timestamp,
			path: request.url,
			message: errorMessage,
		});
	}
}
