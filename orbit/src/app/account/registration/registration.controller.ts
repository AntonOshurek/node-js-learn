import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
//SERVICES
import { RegistrationService } from './registration.service';
//DTO
import { CreateUserDto } from '../user/@registration';
import { RegistrationResponseDto } from './dto/registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RegistrationResponseDto> {
    return await this.registrationService.create(createUserDto);
  }
}
