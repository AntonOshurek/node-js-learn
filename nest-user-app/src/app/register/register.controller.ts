import {
	Controller,
	Post,
	Body,
	HttpCode,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
//SERVICE
import { RegisterService } from './register.service.js';
//DATA
import { UserRegistrationDto } from './dto/create-register.dto.js';

@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	create(@Body() userRegistrationDto: UserRegistrationDto) {
		return this.registerService.userRegistration(userRegistrationDto);
	}
}
