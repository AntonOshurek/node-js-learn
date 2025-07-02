import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
//SERVICES
import { RegistrationService } from './registration.service';
//DTO
import { CreateUserDto } from '../user/@registration';
import {
  CreateResponseDto,
  RegistrationResponseDto,
} from './dto/registration.dto';
//LIBS
import * as ms from 'ms';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly configService: ConfigService,
  ) {}

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
    const registeredUser: CreateResponseDto =
      await this.registrationService.create(createUserDto);

    // const accessTokenExpiresIn =
    //   this.configService.get<string>('JWT_EXPIRES_IN') || '15m';
    // const refreshTokenExpiresIn =
    //   this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';

    res.cookie('access_token', registeredUser.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('15m'),
      sameSite: 'lax',
    });

    res.cookie('refresh_token', registeredUser.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('6d'),
      sameSite: 'lax',
    });

    return registeredUser.userData;
  }
}
