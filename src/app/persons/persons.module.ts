import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from './entities/persons.entity';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
