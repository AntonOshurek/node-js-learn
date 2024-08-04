import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//MODULE
import { UserModule } from '../user/user.module.js';
//SERVICE
import { AuthService } from './auth.service.js';
//CONTROLLER
import { AuthController } from './auth.controller.js';
//MODULE
import { JwtConfigModule } from '../../utils-modules/jwt/jwt.module.js';
//DATA
import { User, UserSchema } from '../user/schema/user.schema.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtConfigModule,
		UserModule,
		ConfigModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
