import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { User } from './user.schema.js';

class createDTO {
	@IsString()
	name: string;

	@IsInt()
	age: number;
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

	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	@Post()
	async sendData(@Body() body: createDTO): Promise<User> {
		return this.appService.sendData(body);
	}

	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	@Put(':id')
	async updateUserById(
		@Param('id') id: string,
		@Body() updateData: Partial<createDTO>,
	): Promise<User> {
		return this.appService.updateUserById(id, updateData);
	}
}
