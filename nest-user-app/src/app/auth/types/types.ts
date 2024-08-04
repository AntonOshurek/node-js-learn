import { Role } from 'src/app/user/roles/role.enum.js';

export interface ILogonReturnData {
	access_token: string;
	user_name: string;
}

export interface ITokenPayload {
	username: string;
	email: string;
	role: Role[];
}

export interface IGetTokenReturnData {
	access_token: string;
}
