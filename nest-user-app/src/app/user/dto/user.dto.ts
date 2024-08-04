import { IsString, IsInt } from 'class-validator';
import type { Types } from 'mongoose';
import { Role } from '../roles/role.enum.js';

export class userDTO {
	@IsString()
	_id: Types.ObjectId;

	@IsString()
	userName: string;

	@IsString()
	email: string;

	@IsString()
	role: Role[];

	@IsString()
	password: string;
}
