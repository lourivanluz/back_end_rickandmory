import { ApiProperty } from '@nestjs/swagger';
import { PersonShortInfoSwagger } from './PersonShortInfo.swagger';

class GenericSwagger {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class PersonFullInfoSwagger extends PersonShortInfoSwagger {
  @ApiProperty()
  origin: GenericSwagger;

  @ApiProperty()
  location: GenericSwagger;

  @ApiProperty()
  episodes: string[];
}
