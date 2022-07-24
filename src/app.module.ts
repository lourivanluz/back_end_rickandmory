import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { PersonsModule } from './app/persons/persons.module';

@Module({
  imports: [DatabaseModule, UsersModule, PersonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
