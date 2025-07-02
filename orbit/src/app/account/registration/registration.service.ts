import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
//SERVICES
import { JwtService } from '../security/jwt/jwt.service';
//DTO
import { CreateUserDto, UserService } from '../user/@registration';
import {
  CreateResponseDto,
  RegistrationResponseDto,
} from './dto/registration.dto';
import { CryptoService } from '../security/crypto/crypto.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(
    createRegistrationDto: CreateUserDto,
  ): Promise<CreateResponseDto> {
    const existingUser = await this.userService.getUserByEmail(
      createRegistrationDto.email,
    );

    if (existingUser !== null) {
      throw new HttpException(
        'Użytkownik z tym adresem email już istnieje',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHash = await this.cryptoService.hashPassword(
      createRegistrationDto.password,
    );

    const preparedUser: CreateUserDto = {
      ...createRegistrationDto,
      password: passwordHash,
    };

    const createdUser = await this.userService.create(preparedUser);
    const tokenPayload = {
      sub: createdUser._id.toString(),
      username: createdUser.userName,
    };

    const token = await this.JwtService.generateToken(tokenPayload);

    const refreshToken =
      await this.JwtService.generateRefreshToken(tokenPayload);

    return {
      accessToken: token.access_token,
      refreshToken: refreshToken.access_token,
      userData: plainToInstance(RegistrationResponseDto, {
        ...createdUser.toObject(),
      }),
    };
  }
}
