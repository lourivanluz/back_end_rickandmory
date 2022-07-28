import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/app/users/entities/users.entity';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const data = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(data),
    };
  }
  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }
    const machPassword = compareSync(password, user.password);

    if (!machPassword) {
      return null;
    }

    return user;
  }
}
