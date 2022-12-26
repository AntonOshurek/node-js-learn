import { Logger } from 'tslog';

export class LoggerService {
  public loger;

  constructor() {
    this.loger = new Logger({ name: "logger.srvice" });
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
}
