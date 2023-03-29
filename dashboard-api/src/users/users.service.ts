import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import type { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import type { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async create({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);

		const salt = this.configService.get('SALT');
		console.log(salt);

		await newUser.setPassword(password, Number(salt));

		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
