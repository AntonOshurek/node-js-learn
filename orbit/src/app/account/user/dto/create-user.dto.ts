//LIBS
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(5, 255, {
    message: 'Nazwa użytkownika musi mieć co najmniej 5 znaków',
  })
  @IsString({ message: 'Nazwa użytkownika musi być tekstem' })
  userName: string;

  @IsEmail({}, { message: 'Nieprawidłowy format adresu email' })
  email: string;

  @IsString({ message: 'Hasło musi być tekstem' })
  @Length(8, 255, { message: 'Hasło musi mieć co najmniej 8 znaków' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Hasło musi zawierać co najmniej 1 wielką literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny',
  })
  password: string;
}
