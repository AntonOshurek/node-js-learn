import { Module } from '@nestjs/common';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//CONTROLLER
import { UserController } from './user.controller.js';
//SERVICE
import { UserService } from './user.service.js';
//DATA
import { User, UserSchema } from './schema/user.schema.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
