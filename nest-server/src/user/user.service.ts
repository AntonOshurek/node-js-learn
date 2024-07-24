import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
//DB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema.js';
//CRYPTO
import { compare, genSaltSync, hash } from 'bcrypt';
import { userDTO } from './dto/user.dto.js';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async getUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async getUserById(id: string): Promise<User> {
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

		console.log(newUserData);

		return newUserData;
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).exec();
	}

	async createUser(newItem: User): Promise<User> {
		const createdUser = new this.userModel({
			...newItem,
			password: this.generateHash(newItem.password),
		});
		return createdUser.save();
	}

	async login(credentials: User): Promise<User> {
		const findedUser = await this.getUserByEmail(credentials.email);

		if (!findedUser) {
			throw new HttpException('uncorrect credentials', HttpStatus.NOT_FOUND);
		}

		const compareResult = await compare(
			credentials.password,
			findedUser.password,
		);

		if (!compareResult) {
			throw new UnauthorizedException();
		}

		return credentials;
	}

	async generateHash(password: string): Promise<string> {
		const salt = genSaltSync(10);
		const hashpass = await hash(password, salt);

		return hashpass;
	}
}
