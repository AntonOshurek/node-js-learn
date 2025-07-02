import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
//TYPES
import type { IGetTokenReturnData, ITokenPayload } from './model/jwt.model';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    tokenPayload: ITokenPayload,
  ): Promise<IGetTokenReturnData> {
    const token = await this.jwtService.signAsync(tokenPayload);

    return {
      access_token: token,
    };
  }

  async generateRefreshToken(
    tokenPayload: ITokenPayload,
  ): Promise<IGetTokenReturnData> {
    const token = await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
    });

    return { access_token: token };
  }

  async validateToken(token: string): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          `Twój token dostępu jest nieprawidłowy lub wygasł. Zaloguj się ponownie. Error message: ${error.message}`,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Twój token dostępu jest nieprawidłowy lub wygasł. Zaloguj się ponownie.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  async validateRefreshToken(token: string): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          `Twój refresh token jest nieprawidłowy lub wygasł. Zaloguj się ponownie. Error message: ${error.message}`,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Twój refresh token jest nieprawidłowy lub wygasł. Zaloguj się ponownie.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
