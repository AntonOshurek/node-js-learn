export interface ILogger {
	loger: unknown;

	log: (...arg: unknown[]) => void;
	error: (...arg: unknown[]) => void;
	warn: (...arg: unknown[]) => void;
}
