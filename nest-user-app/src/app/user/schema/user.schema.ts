import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Group } from '../groups/groups.enum.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
	@Prop()
	userName: string;

	@Prop()
	email: string;

	@Prop({ type: [String], enum: Group, required: true })
	groups: Group[];

	@Prop({ select: false })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
