import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//SERVICE
import { UserService } from '../user/user.service.js';
import { AuthService } from '../auth/auth.service.js';
//DATA
import { User, UserDocument } from '../user/schema/user.schema.js';
import {
	UserRegistrationDto,
	UserRegistrationResponseDto,
} from './dto/create-register.dto.js';

@Injectable()
export class RegisterService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	async userRegistration(
		userRegistrationDto: UserRegistrationDto,
	): Promise<UserRegistrationResponseDto> {
		const isEmailAlredyIsset = await this.userService.getUserByEmail(
			userRegistrationDto.email,
		);

		if (isEmailAlredyIsset !== null) {
			throw new HttpException(
				'User with this email alredy exist',
				HttpStatus.CONFLICT,
			);
		}

		const passwordHash = await this.userService.generateHash(
			userRegistrationDto.password,
		);

		const createdUser = new this.userModel({
			...userRegistrationDto,
			password: passwordHash,
		});

		let savedUser;
		try {
			savedUser = await createdUser.save();
		} catch (error) {
			throw new HttpException(
				'An error occurred while saving the user',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		const token = await this.authService.getToken({
			email: createdUser.email,
			username: createdUser.name,
		});

		const response = {
			...savedUser.toObject(),
			access_token: token.access_token,
		};

		return response;
	}
}
