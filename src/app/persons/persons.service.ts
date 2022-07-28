import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  findOrCreateEpisodes,
  findOrCreateGenerics,
} from '../commons/entity.service';
import { personSerialize } from '../commons/serializers.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { LocationsEntity } from './entities/location.entity';
import { OriginEntity } from './entities/origin.entity';
import { PersonsEntity } from './entities/persons.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonsEntity)
    private readonly personRepository: Repository<PersonsEntity>,
  ) {}
  async create(data: CreatePersonDto) {
    try {
      const origin: OriginEntity = await findOrCreateGenerics(
        data.origin,
        OriginEntity,
      );
      const location: LocationsEntity = await findOrCreateGenerics(
        data.location,
        LocationsEntity,
      );
      const episodes = await findOrCreateEpisodes(data.episode);

      const result = await this.personRepository.save(
        this.personRepository.create({ ...data, origin, location, episodes }),
      );
      return personSerialize(result);
    } catch (error) {
      throw new BadRequestException(
        `o campo ${error.column} de ${error.table} é obrigatorio`,
      );
    }
  }
}
