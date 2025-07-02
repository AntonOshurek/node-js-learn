import { Module } from '@nestjs/common';
//MODULES
import { UserModule } from './user/user.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [UserModule, RegistrationModule],
})
export class AccountModule {}
