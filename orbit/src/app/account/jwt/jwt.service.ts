import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async validateToken(token: string): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          `An error occurred while saving the user. Error message: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'An unknown error occurred while saving the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
