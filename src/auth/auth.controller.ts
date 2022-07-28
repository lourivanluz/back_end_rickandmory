import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseSwagger } from 'src/app/swagger/loginResponse.swagger';
import { UserGenerctError } from 'src/app/swagger/UserGenerctError.swagger';
import { AuthService } from './auth.service';

@Controller('api/v1/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully created',
    type: LoginResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'User unauthorized',
    type: UserGenerctError,
  })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
