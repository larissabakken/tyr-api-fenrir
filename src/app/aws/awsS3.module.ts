import { Module } from '@nestjs/common';

import { AwsS3Service } from './awsS3.service';
import { UploadController } from '../upload/upload.controller';

@Module({
  providers: [AwsS3Service],
  controllers: [UploadController],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
