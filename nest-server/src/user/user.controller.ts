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
//DATA
import { userDTO } from './dto/user.dto.js';
//SERVICES
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAll(): Promise<userDTO[]> {
		return this.userService.getUsers();
	}

	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<userDTO> {
		const getResult = this.userService.getUserById(id);

		if (getResult) {
			return getResult;
		} else {
			throw new BadRequestException('Something bad happened', {
				cause: new Error(),
				description: `Not found id - ${id}`,
			});
		}
	}

	@Post()
	@HttpCode(201)
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async createUser(@Body() body: userDTO): Promise<userDTO> {
		return this.userService.createUser(body);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUserById(
		@Param('id') id: string,
		@Body() updateData: Partial<userDTO>,
	): Promise<Partial<userDTO>> {
		return this.userService.updateUserById(id, updateData);
	}

	@Post('login')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async login(@Body() body: userDTO): Promise<userDTO> {
		return this.userService.login(body);
	}
}
