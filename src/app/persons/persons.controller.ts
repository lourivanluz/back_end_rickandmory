import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePersonDto } from './dto/createPerson.dto';
import { PersonsService } from './persons.service';

@Controller('api/v1/persons/')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPerson(@Body() data: CreatePersonDto[]) {
    const result = [];
    for (const iten of data) {
      result.push(await this.personService.create(iten));
    }
    return result;
  }
}
