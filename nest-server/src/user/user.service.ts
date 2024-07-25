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
import { createUserDTO, userDTO, userLoginDTO } from './dto/user.dto.js';
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
		const createdUser = new this.userModel({
			...newItem,
			password: await this.generateHash(newItem.password),
		});
		return createdUser.save();
	}

	async login(credentials: userLoginDTO): Promise<{ access_token: string }> {
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

		const payload = { sub: findedUser._id, username: findedUser.email };
		const token = await this.jwtService.signAsync(payload);

		return {
			access_token: token,
		};
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
