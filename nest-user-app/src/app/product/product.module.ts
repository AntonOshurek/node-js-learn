import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { AuthGuard } from '../auth/guards/authGuard.js';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [ProductController],
	providers: [ProductService, AuthGuard],
	imports: [ConfigModule, JwtModule],
})
export class ProductModule {}
