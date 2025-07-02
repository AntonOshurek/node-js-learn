import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
//SERVICE
import { RegisterService } from './register.service.js';
//DATA
import {
  UserRegistrationDto,
  UserRegistrationResponseDto,
} from './dto/create-register.dto.js';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() userRegistrationDto: UserRegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserRegistrationResponseDto> {
    const registredUser =
      await this.registerService.userRegistration(userRegistrationDto);

    res.cookie('access_token', registredUser.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return registredUser;
  }
}
