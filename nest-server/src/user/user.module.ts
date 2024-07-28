import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.stratagy.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (ConfigService: ConfigService) => {
				const secret = ConfigService.get<string>('SECRET');

				return {
					secret: secret,
					signOptions: { expiresIn: '60m' },
				};
			},
		}),
		PassportModule,
		ConfigModule,
	],
	controllers: [UserController],
	providers: [UserService, JwtStratagy],
	exports: [JwtModule],
})
export class UserModule {}
