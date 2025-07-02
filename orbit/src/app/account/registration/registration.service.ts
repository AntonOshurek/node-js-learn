import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//SERVICES
import { JwtService } from '@nestjs/jwt';
//DTO
import { CreateUserDto, UserService } from '../user/@registration';
import { RegistrationResponseDto } from './dto/registration.dto';
//TYPES
import type { IGetTokenReturnData, ITokenPayload } from './model/auth.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createRegistrationDto: CreateUserDto,
  ): Promise<RegistrationResponseDto> {
    const existingUser = await this.userService.getUserByEmail(
      createRegistrationDto.email,
    );

    if (existingUser !== null) {
      throw new HttpException(
        'Użytkownik z tym adresem email już istnieje',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHash = await this.userService.generateHash(
      createRegistrationDto.password,
    );

    const preparedUser: CreateUserDto = {
      ...createRegistrationDto,
      password: passwordHash,
    };

    const createdUser = await this.userService.create(preparedUser);

    const token = await this.generateToken({
      sub: createdUser._id.toString(),
      username: createdUser.userName,
    });

    return plainToInstance(RegistrationResponseDto, {
      ...createdUser.toObject(),
      access_token: token.access_token,
    });
  }

  async generateToken(
    tokenPayload: ITokenPayload,
  ): Promise<IGetTokenReturnData> {
    const token = await this.jwtService.signAsync(tokenPayload);

    return {
      access_token: token,
    };
  }
}
