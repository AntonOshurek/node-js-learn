import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { AuthGuard } from '../auth/guards/authGuard.js';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
