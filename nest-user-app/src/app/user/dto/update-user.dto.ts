import { PartialType } from '@nestjs/mapped-types';
import { userDTO } from './user.dto.js';

export class UpdateUserDto extends PartialType(userDTO) {}
