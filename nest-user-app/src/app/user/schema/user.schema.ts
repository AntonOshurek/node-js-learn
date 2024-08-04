import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../roles/role.enum.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
	@Prop()
	userName: string;

	@Prop()
	email: string;

	@Prop()
	role: Role[];

	@Prop({ select: false })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
