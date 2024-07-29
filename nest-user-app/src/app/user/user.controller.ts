import {
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
//DATA
import { userDTO } from './dto/user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
//SERVICES
import { UserService } from './user.service.js';
import { User } from './schema/user.schema.js';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('all')
	async getAll(): Promise<userDTO[]> {
		return await this.userService.getAllUsers();
	}

	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<userDTO> {
		return await this.userService.getUserById(id);
	}

	@Post()
	@HttpCode(201)
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async createUser(@Body() newUser: CreateUserDto): Promise<User> {
		return await this.userService.createUser(newUser);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUserById(
		@Param('id') id: string,
		@Body() updateData: UpdateUserDto,
	): Promise<Partial<userDTO>> {
		return this.userService.updateUserById(id, updateData);
	}
}
