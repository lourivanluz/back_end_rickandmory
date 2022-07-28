import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty()
  statusCode: string;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  error: string;
}
