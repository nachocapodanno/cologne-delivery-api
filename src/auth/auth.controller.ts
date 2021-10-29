import { Controller, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersAuthenticateRequestDto } from '../users/dto/users-authenticate-request.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Public} from "./public.decorator";
import {UsersAuthenticateResponseDto} from "../users/dto/users-authenticate-response.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Get access token for authenticated request.' })
  @ApiTags('security')
  @ApiResponse({
    status: 200,
    description: 'User authenticated',
  })
  async createToken(
    @Response() res: any,
    @Body() body: UsersAuthenticateRequestDto,
  ): Promise<UsersAuthenticateResponseDto> {
    if (!(body && body.username && body.password)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username and password are required!' });
    }

    const user = await this.usersService.findOne(body.username);

    if (user) {
        const token = await this.authService.signIn(user);
        return res.status(HttpStatus.OK).json({
          token,
          id: user.id,
        });
    } else {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Bad credentials' });
    }
  }
}
