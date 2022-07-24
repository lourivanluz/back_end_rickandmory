import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonDto } from './dto/createPerson.dto';
import { PersonsService } from './persons.service';

@Controller('api/v1/persons/')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Post()
  async createPerson(@Body() data: CreatePersonDto) {
    return await this.personService.create(data);
  }
}
