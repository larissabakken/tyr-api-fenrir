import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({
    example: 'email@tyr.com',
    required: true,
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
