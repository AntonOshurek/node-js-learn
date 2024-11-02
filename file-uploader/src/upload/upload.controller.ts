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
  HttpStatus,
  HttpException,
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
    @Res() res: Response,
  ) {
    try {
      await this.uploadService.uploadFile(file);

      return res.status(HttpStatus.CREATED).json({
        message: 'Файл успешно загружен',
        fileName: file.originalname,
      });
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error.message);

      throw new HttpException(
        'Не удалось загрузить файл',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const fileStream = await this.uploadService.findOne(id);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${id}"`,
    });

    fileStream.pipe(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.uploadService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: `Файл с id ${id} успешно удален`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Перехватываем ошибку, если она выброшена в сервисе
      }
      throw new HttpException(
        'Не удалось удалить файл по техническим причинам',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
