import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
	@Post('create')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

	@Get(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async get(@Param('id') id: string) {}

	@Delete(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

	@HttpCode(200)
	@Post()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async find(@Body() dto: FindTopPageDto) {}
}
