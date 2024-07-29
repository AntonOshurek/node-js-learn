import { userDTO } from './user.dto.js';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(userDTO, ['_id'] as const) {}
