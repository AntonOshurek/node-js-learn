import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
	@Post('create')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

	@Delete(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(@Param('id') id: string) {}

	@Get('byProduct/:productId')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getByProduct(@Param('productId') productId: string) {}
}
