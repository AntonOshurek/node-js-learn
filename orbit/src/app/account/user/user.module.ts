import { Module } from '@nestjs/common';
//SERVICES
import { UserService } from './user.service';
//CONTROLLERS
import { UserController } from './user.controller';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//ENTITIES
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
