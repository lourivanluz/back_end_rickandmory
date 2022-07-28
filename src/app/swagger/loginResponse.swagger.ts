import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseSwagger {
  @ApiProperty()
  token: string;
}
