import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Ip,
	Res,
	HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
//SERVICES
import { AuthService } from './auth.service.js';
//DTO
import { logonAuthDto } from './dto/logon-auth.dto.js';
//TYPES
import type { ILogonReturnData } from './types/types.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('logon')
	@HttpCode(200)
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async logon(
		@Body() credentials: logonAuthDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<ILogonReturnData> {
		const logonResult = await this.authService.logon(credentials);

		res.cookie('access_token', logonResult.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 3600000,
		});

		return logonResult;
	}
}
