import { IsEmail } from 'class-validator';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  @IsString()
  name: string;

  @IsString()
  cpf: string;
}
