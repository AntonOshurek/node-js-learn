import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
//MIDLEWARE
import { HostMiddleware } from '../middleware/host.midleware.js';
import { LoggerMiddleware } from '../middleware/logger.midleware.js';
//MODULES
import { JwtConfigModule } from '../utils-modules/jwt/jwt.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RegisterModule } from './register/register.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_PATH'),
			}),
			inject: [ConfigService],
		}),
		UserModule,
		ProductModule,
		AuthModule,
		JwtConfigModule,
		RegisterModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(HostMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL }); // Применяем middleware ко всем маршрутам
	}
}
