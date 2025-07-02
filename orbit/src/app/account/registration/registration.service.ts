import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//SERVICES
import { JwtService } from '@nestjs/jwt';
//DB
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//ENTITIES
import { UserDocument } from '../user/entities/user.entity';
//DTO
import { CreateUserDto, User, UserService } from '../user/@registration';
import { RegistrationResponseDto } from './dto/registration.dto';
//TYPES
import type { IGetTokenReturnData, ITokenPayload } from './model/auth.model';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createRegistrationDto: CreateUserDto,
  ): Promise<RegistrationResponseDto> {
    const isEmailAlreadyIsset = await this.userService.getUserByEmail(
      createRegistrationDto.email,
    );

    if (isEmailAlreadyIsset !== null) {
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
      username: createdUser.userName,
    });

    return {
      ...createdUser.toObject(),
      access_token: token.access_token,
    };
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
