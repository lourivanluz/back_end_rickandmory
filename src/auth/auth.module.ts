import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './stratagies/local.strategy';
import { JWTStrategy } from './stratagies/jwt.strategy';
import { IsOwnerGuard } from './auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: '12H' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy,IsOwnerGuard],
  controllers: [AuthController],
  exports:[IsOwnerGuard]
})
export class AuthModule {}
