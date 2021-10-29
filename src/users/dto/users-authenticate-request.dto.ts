import { ApiProperty } from '@nestjs/swagger';

export class UsersAuthenticateRequestDto {
  @ApiProperty({ example: 'test_user' })
  username: string;

  @ApiProperty({ example: 'api2021' })
  password: string;
}
