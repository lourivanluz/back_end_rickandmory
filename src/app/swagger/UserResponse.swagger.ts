import { ApiProperty } from '@nestjs/swagger';
import { PersonShortInfoSwagger } from './PersonShortInfo.swagger';

export class UserResponseSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  favorites: PersonShortInfoSwagger[];
}
