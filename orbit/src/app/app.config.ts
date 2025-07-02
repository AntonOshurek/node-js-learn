import {ConfigModule} from '@nestjs/config';
import {validationSchema} from '../config/validation';
import {AccountModule} from "./account/account.module";
import {DatabaseModule} from "../database/database.module";

export const appImports = [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        validationSchema,
    }),
    AccountModule,
    DatabaseModule
];