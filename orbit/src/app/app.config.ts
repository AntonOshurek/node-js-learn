import { ConfigModule } from '@nestjs/config';
//MODULES
import { AccountModule } from './account/account.module';
import { DatabaseModule } from '../database/database.module';
//CONFIGS
import { validationSchema } from '../config/validation';

export const appImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    validationSchema,
  }),
  AccountModule,
  DatabaseModule,
];
