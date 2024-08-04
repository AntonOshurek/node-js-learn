import { Injectable, UnauthorizedException } from '@nestjs/common';
//LIBS
import { compare } from 'bcrypt';
//SERVICE
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
//DATA
import { logonAuthDto } from './dto/logon-auth.dto.js';
//TYPES
import type {
	IGetTokenReturnData,
	ILogonReturnData,
	ITokenPayload,
} from './types/types.js';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async logon(credentials: logonAuthDto): Promise<ILogonReturnData> {
		const findedUser = await this.userService.getUserByEmailWithPassword(
			credentials.email,
		);

		if (!findedUser) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const compareResult = await compare(
			credentials.password,
			findedUser.password,
		);

		if (!compareResult) {
			throw new UnauthorizedException('Invalid password');
		}

		const payload: ITokenPayload = {
			email: findedUser.email,
			username: findedUser.userName,
			role: findedUser.role,
		};
		const token = await this.jwtService.signAsync(payload);

		return {
			access_token: token,
			user_name: findedUser.userName,
		};
	}

	async getToken(tokenPayload: ITokenPayload): Promise<IGetTokenReturnData> {
		const token = await this.jwtService.signAsync(tokenPayload);

		return {
			access_token: token,
		};
	}
}
