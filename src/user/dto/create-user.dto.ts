import { IsString, Matches, MaxLength, MinLength, IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^[0-9]+$/, {
    message: 'cpf must contain only numbers',
  })
  cpf: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  permission: string;

}
