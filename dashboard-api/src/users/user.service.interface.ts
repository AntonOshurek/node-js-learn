import { UserModel } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUserService {
	create: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
