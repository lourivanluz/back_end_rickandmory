import { ApiProperty } from '@nestjs/swagger';

export class UserGenerctError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
