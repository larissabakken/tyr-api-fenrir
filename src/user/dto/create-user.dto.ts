import { IsEmail } from 'class-validator';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak',
    })
  password: string;

  @IsString()
  name: string;

  @IsString()
  cpf: string;
}
