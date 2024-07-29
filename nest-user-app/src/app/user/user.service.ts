import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
//DB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema.js';
//CRYPTO
import { genSaltSync, hash } from 'bcrypt';
//DATA
import { userDTO } from './dto/user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async getAllUsers(): Promise<userDTO[]> {
		try {
			const users = await this.userModel.find().exec();
			return users;
		} catch (error) {
			throw new InternalServerErrorException('Failed to fetch users');
		}
	}

	async getUserById(id: string): Promise<userDTO> {
		try {
			const user = await this.userModel.findById(id).exec();
			if (!user) {
				throw new NotFoundException(`User with ID ${id} not found`);
			}
			return user;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new InternalServerErrorException('Failed to fetch user by id');
		}
	}

	async updateUserById(
		id: string,
		newUserData: UpdateUserDto,
	): Promise<UpdateUserDto> {
		const updateData = { ...newUserData };

		if (newUserData.password) {
			updateData.password = await this.generateHash(newUserData.password);
		}

		await this.userModel
			.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
			.exec();

		return newUserData;
	}

	async createUser(newUser: CreateUserDto): Promise<User> {
		const isEmailAlredyIsset = await this.getUserByEmail(newUser.email);

		if (isEmailAlredyIsset !== null) {
			throw new HttpException(
				'User with this email alredy exist',
				HttpStatus.CONFLICT,
			);
		}

		const createdUser = new this.userModel({
			...newUser,
			password: await this.generateHash(newUser.password),
		});
		return createdUser.save();
	}

	async generateHash(password: string): Promise<string> {
		const salt = genSaltSync(10);
		const hashpass = await hash(password, salt);

		return hashpass;
	}

	private async getUserByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec();
	}
}
