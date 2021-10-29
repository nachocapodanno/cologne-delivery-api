import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userssService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign in with JWT.
   */
  async signIn(client: User): Promise<string> {
    const data: JwtPayload = { username: client.username };

    return await this.jwtService.sign(data);
  }

  /**
   * Validate existing user.
   * @param payload
   */
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userssService.findOne(payload.username);
  }
}
