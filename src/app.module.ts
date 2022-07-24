import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { PersonsModule } from './app/persons/persons.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, PersonsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
