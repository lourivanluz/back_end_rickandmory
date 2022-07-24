import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesEntity } from 'src/app/persons/entities/episode.entity';
import { LocationsEntity } from 'src/app/persons/entities/location.entity';
import { OriginEntity } from 'src/app/persons/entities/origin.entity';
import { PersonsEntity } from 'src/app/persons/entities/persons.entity';
import { UserEntity } from 'src/app/users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        UserEntity,
        EpisodesEntity,
        LocationsEntity,
        PersonsEntity,
        OriginEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
