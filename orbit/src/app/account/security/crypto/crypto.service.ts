import { Injectable } from '@nestjs/common';
//LIBS
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    return await compare(password, hashed);
  }
}
