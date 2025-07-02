import { Module } from '@nestjs/common';
//MODULES
import { UserModule } from './user/user.module';
import { RegistrationModule } from './registration/registration.module';
import { CryptoModule } from './security/crypto/crypto.module';
import { JwtConfigModule } from './security/jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    RegistrationModule,
    CryptoModule,
    JwtConfigModule,
    CryptoModule,
  ],
})
export class AccountModule {}
