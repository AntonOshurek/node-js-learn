import { Module } from '@nestjs/common';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//SERVICES
import { AuthService } from './auth.service.js';
//CONTROLLERS
import { AuthController } from './auth.controller.js';
//MODULES
import { JwtConfigModule } from '../../utils-modules/jwt/jwt.module.js';
//DATA
import { User, UserSchema } from '../user/schema/user.schema.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtConfigModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
