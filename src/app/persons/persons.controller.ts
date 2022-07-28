import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PersonCreateSwagger } from '../swagger/PersonCreate.swagger';
import { UnauthorizedSwagger } from '../swagger/Unauthorized.swagger';
import { CreatePersonDto } from './dto/createPerson.dto';
import { PersonsService } from './persons.service';

@Controller('api/v1/persons/')
@ApiTags('Person routes')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new person successfully' })
  @ApiBody({ isArray: true, type: CreatePersonDto })
  @ApiResponse({
    status: 201,
    description: 'Create a characters successfully',
    type: PersonCreateSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  async createPerson(@Body() data: CreatePersonDto[]) {
    const result = [];
    for (const iten of data) {
      result.push(await this.personService.create(iten));
    }
    return result;
  }
}
