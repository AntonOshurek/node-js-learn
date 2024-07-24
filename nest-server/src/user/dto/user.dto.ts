import { IsString, IsInt } from 'class-validator';

export class userDTO {
	@IsString()
	name: string;

	@IsInt()
	age: number;

	@IsString()
	email: string;

	@IsString()
	password: string;
}
