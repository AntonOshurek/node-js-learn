import { Body, Controller, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	@Post('register')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async register(@Body() dto: AuthDto) {}

	@HttpCode(200)
	@Post('login')
	async login() {}
}
