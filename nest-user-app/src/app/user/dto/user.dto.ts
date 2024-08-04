import {
	IsString,
	IsArray,
	ArrayNotEmpty,
	ArrayUnique,
	IsEnum,
} from 'class-validator';
import type { Types } from 'mongoose';
import { Group } from '../groups/groups.enum.js';

export class userDTO {
	@IsString()
	_id: Types.ObjectId;

	@IsString()
	userName: string;

	@IsString()
	email: string;

	@IsArray()
	@ArrayNotEmpty()
	@ArrayUnique()
	@IsEnum(Group, { each: true })
	groups: Group[];

	@IsString()
	password: string;
}
