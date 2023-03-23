//dependencies
import { injectable } from 'inversify';
import { Logger } from 'tslog'; //библиотека для логирования. NPM - https://www.npmjs.com/package/tslog
//types
import type { ILogger } from './loger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public loger;

	constructor() {
		this.loger = new Logger({
			name: 'logger.srvice',
			prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}}\t',
		});
	}

	log(...arg: unknown[]): void {
		this.loger.info(...arg);
	}

	error(...arg: unknown[]): void {
		this.loger.error(...arg);
	}

	warn(...arg: unknown[]): void {
		this.loger.warn(...arg);
	}
}
