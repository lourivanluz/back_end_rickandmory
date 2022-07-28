import { ApiProperty } from '@nestjs/swagger';

export class PersonShortInfoSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  species: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  created: string;
}
