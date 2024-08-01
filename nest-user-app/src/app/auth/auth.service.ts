import { Injectable, UnauthorizedException } from '@nestjs/common';
//LIBS
import { compare } from 'bcrypt';
//DB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//SERVICE
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
//DATA
import { logonAuthDto } from './dto/logon-auth.dto.js';
import { User, UserDocument } from '../user/schema/user.schema.js';
//TYPES
import type { ILogonReturnData, ITokenPayload } from './types/types.js';

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
			username: findedUser.name,
		};
		const token = await this.jwtService.signAsync(payload);

		return {
			access_token: token,
			user_name: findedUser.name,
		};
	}

	async getToken() {}
}
