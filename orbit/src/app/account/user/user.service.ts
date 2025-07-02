import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//ENTITIES
import { User, UserDocument } from './entities/user.entity';
//DB
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//LIBS
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      ...createUserDto,
    });

    let savedUser: UserDocument;

    try {
      savedUser = await createdUser.save();
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

    return savedUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async generateHash(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    return await hash(password, salt);
  }
}
