//ENTITIES
import { User } from '../../user/@registration';

export class RegistrationResponseDto extends User {
  access_token: string;
}
