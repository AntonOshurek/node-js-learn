import { IsString } from 'class-validator';

export class logonAuthDto {
	@IsString()
	email: string;

	@IsString()
	password: string;
}
