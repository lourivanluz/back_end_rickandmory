import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRepository } from 'typeorm';
import { CreatePersonDto } from '../persons/dto/createPerson.dto';
import { PersonsEntity } from '../persons/entities/persons.entity';
import { PersonsService } from '../persons/persons.service';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users/')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly personService: PersonsService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserByID(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneOrFail({ id });
  }

  @Post()
  async createUser(@Body() body: UserDtoCreate) {
    return await this.userService.createUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/favorites')
  async createFavorite(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: CreatePersonDto[],
  ) {
    const persons = [];
    for (const bodyIten of body) {
      const personRepo = getRepository(PersonsEntity);
      const person = await personRepo.findOne({
        where: { name: bodyIten.name },
      });
      if (person) persons.push(person);
      if (!person) {
        const newPerson = await this.personService.create(bodyIten);
        delete newPerson.episodes;
        delete newPerson.origin;
        delete newPerson.location;
        persons.push(newPerson);
      }
    }
    const userFavorites = await this.userService.bindUserPerson(id, persons);

    return userFavorites;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/favorites')
  async getFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findFavorites(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserDtoUpdate,
  ) {
    return await this.userService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.delete(id);
  }
}
