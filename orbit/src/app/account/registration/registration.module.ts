import { Module } from '@nestjs/common';
//SERVICES
import { RegistrationService } from './registration.service';
import { UserModule } from '../user/@registration';
//CONTROLLERS
import { RegistrationController } from './registration.controller';

@Module({
  imports: [UserModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
