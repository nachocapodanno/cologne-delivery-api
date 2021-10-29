import { ApiProperty } from '@nestjs/swagger';

export class UsersAuthenticateResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllvbGFuZGFfVG93bmU4NCIsImlhdCI6MTYzNTQyNTgxMCwiZXhwIjoxNjM1NDU5NDEwfQ._kaZ3oP5jPac6KWZvuo5FxclsvlECctasgWc-keojgY' })
  token: string;

  @ApiProperty({ example: '7' })
  id: string;
}
