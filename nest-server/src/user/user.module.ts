import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.stratagy.js';
import { JwtConfigModule } from '../jwt/jwt.module.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtConfigModule,
		PassportModule,
		ConfigModule,
	],
	controllers: [UserController],
	providers: [UserService, JwtStratagy],
	exports: [],
})
export class UserModule {}
