import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	@Post('register')
	async register() {}

	@Post('login')
	async login() {}
}