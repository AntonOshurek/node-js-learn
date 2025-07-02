import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
//SERVICES
import { AuthService } from './auth.service.js';
//DTO
import { logonAuthDto } from './dto/logon-auth.dto.js';
//TYPES
import type { ILogonReturnData } from './types/types.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('logon')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async logon(
    @Body() credentials: logonAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ILogonReturnData> {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const logonResult = await this.authService.logon(credentials);

    res.cookie('access_token', logonResult.access_token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 3600000,
    });

    return logonResult;
  }
}
