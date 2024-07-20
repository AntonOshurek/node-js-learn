import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: '__v' })
export class User {
	@Prop()
	name: string;

	@Prop()
	age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
