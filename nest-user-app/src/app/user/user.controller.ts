import {
	Body,
	Controller,
	Get,
	Param,
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

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('all')
	async getAll(): Promise<userDTO[]> {
		return await this.userService.getAllUsers();
	}

	@Get(':id')
	async getUserById(
		@Param('id') id: string,
		@Req() req: Request,
	): Promise<userDTO> {
		const userFromTokenPayload: ITokenPayload = req['user'];

		return await this.userService.getUserById(id, userFromTokenPayload);
	}

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
