import { IsString, IsInt } from 'class-validator';
import type { Types } from 'mongoose';

export class userDTO {
	@IsString()
	_id: Types.ObjectId;

	@IsString()
	name: string;

	@IsInt()
	age: number;

	@IsString()
	email: string;

	@IsString()
	password: string;
}

export class createUserDTO {
	@IsString()
	name: string;

	@IsInt()
	age: number;

	@IsString()
	email: string;

	@IsString()
	password: string;
}
