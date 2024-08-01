export interface ILogonReturnData {
	access_token: string;
	user_name: string;
}

export interface ITokenPayload {
	username: string;
	email: string;
}

export interface IGetTokenReturnData {
	access_token: string;
}
