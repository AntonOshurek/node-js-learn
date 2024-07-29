import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//DB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema.js';
//CRYPTO
import { genSaltSync, hash } from 'bcrypt';
import { createUserDTO, userDTO } from './dto/user.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async getUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async getUserById(id: string): Promise<UserDocument> {
		return this.userModel.findById(id).exec();
	}

	async updateUserById(
		id: string,
		newUserData: Partial<userDTO>,
	): Promise<Partial<userDTO>> {
		const updateData: Partial<userDTO> = { ...newUserData };

		if (newUserData.password) {
			updateData.password = await this.generateHash(newUserData.password);
		}

		await this.userModel
			.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
			.exec();

		return newUserData;
	}

	async createUser(newItem: createUserDTO): Promise<User> {
		const isEmailAlredyIsset = await this.getUserByEmail(newItem.email);

		if (isEmailAlredyIsset !== null) {
			throw new HttpException(
				'User with this email alredy exist',
				HttpStatus.CONFLICT,
			);
		}

		const createdUser = new this.userModel({
			...newItem,
			password: await this.generateHash(newItem.password),
		});
		return createdUser.save();
	}

	async generateHash(password: string): Promise<string> {
		const salt = genSaltSync(10);
		const hashpass = await hash(password, salt);

		return hashpass;
	}

	async getUserByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec();
	}
}
