import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt } from 'bcrypt';
import { hash } from 'crypto';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
	@Prop()
	name: string;

	@Prop()
	age: number;

	@Prop()
	email: string;

	@Prop({ select: false })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
