import { Injectable, UnauthorizedException } from '@nestjs/common';
//LIBS
import { compare } from 'bcrypt';
//DB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//MODULES
import { JwtService } from '@nestjs/jwt';
//DATA
import { logonAuthDto } from './dto/logon-auth.dto.js';
import { User, UserDocument } from '../user/schema/user.schema.js';
//TYPES
import type { ILogonReturnData } from './types/types.js';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async logon(credentials: logonAuthDto): Promise<ILogonReturnData> {
		const findedUser = await this.getUserByEmail(credentials.email);

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

		const payload = { email: findedUser.email, username: findedUser.name };
		const token = await this.jwtService.signAsync(payload);

		return {
			access_token: token,
			user_name: findedUser.name,
		};
	}

	private async getUserByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec();
	}
}
