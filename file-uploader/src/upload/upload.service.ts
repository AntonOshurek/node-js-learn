import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'fenix-upload-test',
          Key: file.originalname,
          Body: file.buffer,
        }),
      );
    } catch (error) {
      console.error(`Ошибка при загрузке файла в S3: ${error.message}`);
      throw new HttpException(
        'Не удалось загрузить файл',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: 'fenix-upload-test',
      Key: id,
    });

    const output = await this.s3Client.send(command);

    if (output.Body instanceof Readable) {
      return output.Body;
    } else {
      throw new Error('Body is not a readable stream');
    }
  }

  async remove(id: string) {
    const command = new DeleteObjectCommand({
      Bucket: 'fenix-upload-test',
      Key: id,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      console.error(`Ошибка при удалении файла из S3: ${error.message}`);
      throw new HttpException(
        'Не удалось удалить файл',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
