//dependencies
import { Logger } from 'tslog'; //библиотека для логирования. NPM - https://www.npmjs.com/package/tslog
//types
import type { ILoger } from './loger.interface';

export class LoggerService implements ILoger {
  public loger;

  constructor() {
    this.loger = new Logger({
      name: "logger.srvice",
      prettyLogTemplate: "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}}\t",
    });
  };

  log(...arg: unknown[]) {
    this.loger.info(...arg);
  };

  error(...arg: unknown[]) {
    this.loger.error(...arg);
  };

  warn(...arg: unknown[]) {
    this.loger.warn(...arg);
  };
};