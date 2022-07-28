import { ApiPropertyOptional } from '@nestjs/swagger';
import { PersonShortInfoSwagger } from './PersonShortInfo.swagger';
import { UserGenerctError } from './UserGenerctError.swagger';

export class PersonCreateSwagger extends PersonShortInfoSwagger {
  @ApiPropertyOptional({ isArray: true })
  error?: UserGenerctError;
}
