import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
