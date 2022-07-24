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
} from '@nestjs/common';
import { getRepository } from 'typeorm';
import { FavoritePersonDto } from '../persons/dto/favoritePerson.dto';
import { PersonsEntity } from '../persons/entities/persons.entity';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users/')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser() {
    return await this.userService.findAll();
  }
  @Get(':id')
  async getUserByID(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneOrFail({ id });
  }
  @Post()
  async createUser(@Body() body: UserDtoCreate) {
    return await this.userService.createUser(body);
  }

  @Post(':id/favorites')
  async createFavorite(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: FavoritePersonDto[],
  ) {
    const persons = [];
    for (const bodyIten of body) {
      const personRepo = getRepository(PersonsEntity);
      const person = await personRepo.findOne({
        where: { name: bodyIten.name },
      });
      if (person) persons.push(person);
    }

    return await this.userService.bindUserPerson(id, persons);
  }
  @Get(':id/favorites')
  async getFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findFavorites(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserDtoUpdate,
  ) {
    return await this.userService.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.delete(id);
  }
}
