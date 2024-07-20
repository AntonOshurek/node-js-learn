import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { IsInt, IsString } from 'class-validator';
import { User } from './user.schema.js';

class createDTO {
	@IsString()
	name: string;

	@IsInt()
	age: number;

	@IsString()
	email: string;

	@IsString()
	password: string;
}

@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getAll(): Promise<User[]> {
		return this.appService.getData();
	}

	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<User> {
		const getResult = this.appService.getUserById(id);

		if (getResult) {
			return getResult;
		} else {
			throw new BadRequestException('Something bad happened', {
				cause: new Error(),
				description: `Not found id - ${id}`,
			});
		}
	}

	@Post('login')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async login(@Body() body: createDTO): Promise<User> {
		return this.appService.login(body);
	}

	@Post()
	@HttpCode(201)
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async sendData(@Body() body: createDTO): Promise<User> {
		return this.appService.sendData(body);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUserById(
		@Param('id') id: string,
		@Body() updateData: Partial<createDTO>,
	): Promise<User> {
		return this.appService.updateUserById(id, updateData);
	}
}
