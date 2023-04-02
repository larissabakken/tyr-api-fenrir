import { Request } from 'express';
import { User } from 'src/app/users/entities/user.entity';

export interface AuthRequest extends Request {
  principal: User;
}