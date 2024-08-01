import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
//DATA
import { userDTO } from './dto/user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
//GUARDS
import { AuthGuard } from '../auth/guards/authGuard.js';
//SERVICES
import { UserService } from './user.service.js';
//TYPES
import type { ITokenPayload } from '../auth/types/types.js';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('all')
	async getAll(): Promise<userDTO[]> {
		return await this.userService.getAllUsers();
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<userDTO> {
		return await this.userService.getUserById(id);
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUserById(
		@Param('id') id: string,
		@Body() updateData: UpdateUserDto,
		@Req() req: Request,
	): Promise<Partial<userDTO>> {
		const userFromTokenPayload: ITokenPayload = req['user'];
		return this.userService.updateUserById(
			id,
			updateData,
			userFromTokenPayload,
		);
	}
}
