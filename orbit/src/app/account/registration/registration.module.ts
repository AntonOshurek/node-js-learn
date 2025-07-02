import { Module } from '@nestjs/common';
//SERVICES
import { RegistrationService } from './registration.service';
import { UserModule } from '../user/@registration';
//CONTROLLERS
import { RegistrationController } from './registration.controller';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//ENTITIES
import { User, UserSchema } from '../user/@registration';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
