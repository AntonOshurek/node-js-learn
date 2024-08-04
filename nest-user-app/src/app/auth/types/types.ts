import { Group } from 'src/app/user/groups/groups.enum.js';

export interface ILogonReturnData {
	access_token: string;
	userName: string;
	groups: Group[];
}

export interface ITokenPayload {
	username: string;
	email: string;
	groups: Group[];
}

export interface IGetTokenReturnData {
	access_token: string;
}
