import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
//INTERCEPTORS
import { FileInterceptor } from '@nestjs/platform-express';
//SERVICES
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.uploadFile(file);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const fileStream = await this.uploadService.findOne(id);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${id}"`,
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    });

    fileStream.pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
