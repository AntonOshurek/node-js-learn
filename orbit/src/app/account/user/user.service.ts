import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
//CRYPTO
import { genSaltSync, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();

        if (existingUser) {
            throw new HttpException(
                'Użytkownik z tym adresem email już istnieje',
                HttpStatus.CONFLICT,
            );
        }

        const passwordHash = await this.generateHash(
            createUserDto.password,
        );

        const createdUser = new this.userModel({
            ...createUserDto,
            password: passwordHash,
        });

        let savedUser: UserDocument;

        try {
            savedUser = await createdUser.save();
        } catch (error) {
            throw new HttpException(
                `An error occurred while saving the user. Error message: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return savedUser.toObject();
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

    async generateHash(password: string): Promise<string> {
        const salt = genSaltSync(10);
        return await hash(password, salt);
    }
}
