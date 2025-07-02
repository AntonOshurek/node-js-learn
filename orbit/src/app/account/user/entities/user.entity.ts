import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
    _id: Types.ObjectId;

    @Prop()
    userName: string;

    @Prop()
    email: string;

    @Prop({ select: false })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toObject', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});
