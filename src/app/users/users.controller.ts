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
