import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/app/users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
