import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
//LIBS
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          algorithm: configService.get<'HS256' | 'HS384' | 'HS512'>(
            'JWT_ALGORITHM',
          ),
        },
        audience: configService.get<string>('JWT_AUDIENCE'),
        issuer: configService.get<string>('JWT_ISSUER'),
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
