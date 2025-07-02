export class RegistrationResponseDto {
  _id: string;
  userName: string;
  email: string;
}

export class CreateResponseDto {
  userData: RegistrationResponseDto;
  refreshToken: string;
  accessToken: string;
}
