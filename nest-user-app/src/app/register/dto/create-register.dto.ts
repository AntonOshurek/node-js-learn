import { OmitType } from '@nestjs/mapped-types';
//DTO
import { userDTO } from '../../user/dto/user.dto.js';

export class UserRegistrationDto extends OmitType(userDTO, ['_id'] as const) {}
