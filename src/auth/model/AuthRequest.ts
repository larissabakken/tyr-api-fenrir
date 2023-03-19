import { Request } from 'express';
import { User } from 'src/app/user/entities/user.entity';

export interface AuthRequest extends Request {
  principal: User;
}