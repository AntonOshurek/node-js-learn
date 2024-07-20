import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema.js';

@Injectable()
export class AppService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async getData(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async sendData(newItem: User): Promise<User> {
		const createdUser = new this.userModel(newItem);
		return createdUser.save();
	}

	async getUserById(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}

	async updateUserById(id: string, updateData: Partial<User>): Promise<User> {
		return this.userModel
			.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
			.exec();
	}
}
