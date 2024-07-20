import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema.js';
import { genSaltSync, hash, compare } from 'bcrypt';

@Injectable()
export class AppService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async getData(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async sendData(newItem: User): Promise<User> {
		const salt = genSaltSync(10);
		const hashpass = await hash(newItem.password, salt);
		const createdUser = new this.userModel({
			...newItem,
			password: hashpass,
		});
		return createdUser.save();
	}

	async login(credentials: User): Promise<User> {
		const findedUser = await this.updateUserByEmail(credentials.email);

		if (!findedUser) {
			throw new HttpException('uncorrect credentials', HttpStatus.NOT_FOUND);
		}

		const compareResult = await compare(
			credentials.password,
			findedUser.password,
		);

		if (!compareResult) {
			throw new HttpException('uncorrect credentials', HttpStatus.NOT_FOUND);
		}

		return credentials;
	}

	async getUserById(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}

	async updateUserById(id: string, updateData: Partial<User>): Promise<User> {
		return this.userModel
			.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
			.exec();
	}

	async updateUserByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).exec();
	}
}
