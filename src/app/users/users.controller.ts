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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { getRepository } from 'typeorm';
import { PersonsEntity } from '../persons/entities/persons.entity';
import { PersonsService } from '../persons/persons.service';
import { UnauthorizedSwagger } from '../swagger/Unauthorized.swagger';
import { UserResponseSwagger } from '../swagger/UserResponse.swagger';
import { UserGenerctError } from '../swagger/UserGenerctError.swagger';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { UsersService } from './users.service';
import { BadRequestSwagger } from '../swagger/BadRequest.swagger';
import { userSerializer } from '../commons/serializers.service';
import { PersonFullInfoSwagger } from '../swagger/PersonFullInfo.swagger';
import { CreatePersonDto } from '../persons/dto/createPerson.dto';
import { PersonCreateSwagger } from '../swagger/PersonCreate.swagger';
import { IsOwnerGuard } from 'src/auth/auth.guard';

@Controller('api/v1/users/')
@ApiTags('User routes')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly personService: PersonsService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return all users' })
  @ApiResponse({
    status: 200,
    description: 'All users successfully returned',
    type: UserResponseSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  async getUser() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'),IsOwnerGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Renurn user by id' })
  @ApiResponse({
    status: 200,
    description: 'User successfully returned',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserGenerctError,
  })
  async getUserByID(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOneOrFail(
      { id },
      { relations: ['favorites'] },
    );
    return userSerializer(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    type: UserGenerctError,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async createUser(@Body() body: UserDtoCreate) {
    return await this.userService.createUser(body);
  }

  @UseGuards(AuthGuard('jwt'),IsOwnerGuard)
  @Post(':id/favorites')
  @ApiOperation({ summary: 'Merge favorite characters with user successfully' })
  @ApiBearerAuth()
  @ApiBody({ isArray: true, type: CreatePersonDto })
  @ApiResponse({
    status: 201,
    description: 'favorite characters successfully merged',
    type: PersonCreateSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserGenerctError,
  })
  async createFavorite(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: CreatePersonDto[],
  ) {
    const persons = [];
    const errors = [];

    for (const bodyIten of body) {
      const personRepo = getRepository(PersonsEntity);
      const person = await personRepo.findOne({
        where: { name: bodyIten.name },
      });
      if (person) persons.push(person);
      if (!person) {
        try {
          const newPerson = await this.personService.create(bodyIten);
          delete newPerson.episodes;
          delete newPerson.origin;
          delete newPerson.location;
          persons.push(newPerson);
        } catch ({ response }) {
          errors.push(response);
        }
      }
    }

    const userFavorites = await this.userService.bindUserPerson(id, persons);

    return errors.length > 0
      ? { error: errors, ...userFavorites }
      : userFavorites;
  }

  @UseGuards(AuthGuard('jwt'),IsOwnerGuard)
  @Get(':id/favorites')
  @ApiOperation({ summary: 'All user bookmarks returned successfully' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Favorites successfully returned',
    type: PersonFullInfoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserGenerctError,
  })
  async getFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findFavorites(id);
  }

  @UseGuards(AuthGuard('jwt'),IsOwnerGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user successfully' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserGenerctError,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserDtoUpdate,
  ) {
    return await this.userService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'),IsOwnerGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user successfully' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserGenerctError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.delete(id);
  }
}
