import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './dto/create-register.dto.js';
import { User, UserDocument } from '../user/schema/user.schema.js';
import { genSaltSync, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service.js';

@Injectable()
export class RegisterService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly userService: UserService,
	) {}

	async userRegistration(
		userRegistrationDto: UserRegistrationDto,
	): Promise<User> {
		const isEmailAlredyIsset = await this.userService.getUserByEmail(
			userRegistrationDto.email,
		);

		if (isEmailAlredyIsset !== null) {
			throw new HttpException(
				'User with this email alredy exist',
				HttpStatus.CONFLICT,
			);
		}

		const createdUser = new this.userModel({
			...userRegistrationDto,
			password: await this.userService.generateHash(
				userRegistrationDto.password,
			),
		});

		return createdUser.save();
	}
}
