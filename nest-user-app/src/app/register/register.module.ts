import { Module } from '@nestjs/common';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//CONTROLLER
import { RegisterController } from './register.controller.js';
//SERVICE
import { RegisterService } from './register.service.js';
import { UserModule } from '../user/user.module.js';
//DATA
import { User, UserSchema } from '../user/schema/user.schema.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		UserModule,
	],
	controllers: [RegisterController],
	providers: [RegisterService],
})
export class RegisterModule {}
