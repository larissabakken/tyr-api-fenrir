import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UploadDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  format: string;

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
