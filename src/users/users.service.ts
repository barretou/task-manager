import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  protected users: UserDto[] = [];

  create(user: UserDto) {
    user.id = uuidv4();
    user.password = bcryptHashSync(user.password, 10);
    this.users.push(user);
    return user;
  }

  findByName(username: string): UserDto | null {
    const user = this.users.find((u) => u.username === username);
    return user || null;
  }
}
