import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from 'ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(configDB)],
})
export class DatabaseModule {}
