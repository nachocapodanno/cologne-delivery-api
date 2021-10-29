import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import users from '../../assets/data/users';

@Injectable()
export class UsersService {
  private users = users.map(user => JSON.parse(JSON.stringify(user)) as User);

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
