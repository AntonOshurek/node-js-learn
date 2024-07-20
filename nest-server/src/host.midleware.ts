import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HostMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (req.hostname === 'localhost') {
			next();
		} else {
			console.log(`[HostMiddleware] access denied for - ${req.hostname}`);
			res.status(403).send('Forbidden');
		}
	}
}
