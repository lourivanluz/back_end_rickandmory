import { ApiProperty } from '@nestjs/swagger';

export class UserCreateSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
