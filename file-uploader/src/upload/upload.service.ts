import { Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from '@nestjs/config';
import {
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
    const uploadResult = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'fenix-upload-test',
        Key: file.originalname,
        Body: file.buffer,
      }),
    );
    console.log(file.originalname);
    console.log(uploadResult);
  }

  findAll() {
    return `This action returns all upload`;
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

  update(id: number, updateUploadDto: UpdateUploadDto) {
    console.log(updateUploadDto);
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
