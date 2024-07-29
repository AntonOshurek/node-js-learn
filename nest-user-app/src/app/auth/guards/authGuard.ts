import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);

		if (!token) {
			throw new UnauthorizedException(
				'User is not authorized. Token not found.',
			);
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('SECRET'),
			});

			request['user'] = payload;
		} catch {
			throw new UnauthorizedException(
				'User is not authorized. Invalid or expired token.',
			);
		}
		return true;
	}

	private extractToken(request: Request): string | undefined {
		// const [type, token] = request.headers.authorization?.split(' ') ?? [];
		// return type === 'Bearer' ? token : undefined;

		const tokenFromCookie = request.cookies?.access_token;
		if (tokenFromCookie) {
			return tokenFromCookie;
		}
	}
}
