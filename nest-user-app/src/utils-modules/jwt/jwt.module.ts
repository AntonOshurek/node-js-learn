import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('SECRET');
        return {
          secret: secret,
          signOptions: { expiresIn: '60m', algorithm: 'HS256' },
          audience: '',
          issuer: '',
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
