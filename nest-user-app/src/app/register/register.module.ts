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
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    AuthModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
