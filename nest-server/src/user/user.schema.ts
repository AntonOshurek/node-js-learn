import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: '__v' })
export class User {
	@Prop()
	_id: string;

	@Prop()
	name: string;

	@Prop()
	age: number;

	@Prop()
	email: string;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
