import { inject, injectable } from 'inversify';
import type { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import type { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async create({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);

		const salt = this.configService.get('SALT');
		console.log(salt);

		await newUser.setPassword(password, Number(salt));

		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
