import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Ip,
} from '@nestjs/common';
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
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	logon(
		@Body() credentials: logonAuthDto,
		@Ip() ip,
	): Promise<ILogonReturnData> {
		console.log(`logon from ip -${ip}`);
		return this.authService.logon(credentials);
	}
}
