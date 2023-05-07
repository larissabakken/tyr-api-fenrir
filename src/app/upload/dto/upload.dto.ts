import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UploadImageOptions } from 'src/app/aws/awsS3.types';

export class UploadDto implements UploadImageOptions {
  @ApiProperty()
  @IsOptional()
  @IsString()
  format: 'png' | 'jpg';

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  overwrite: boolean;

  @ApiProperty()
  @IsString()
  dir: string;

  @ApiProperty()
  @IsString()
  name: string;
}
