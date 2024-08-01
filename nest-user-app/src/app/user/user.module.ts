import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
