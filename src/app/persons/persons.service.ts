import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  findOrCreateEpisodes,
  findOrCreateGenerics,
} from '../commons/entity.service';
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
    return this.serializer(result);
  }

  /* await this.personRepository
      .createQueryBuilder()
      .insert()
      .into(PersonsEntity)
      .values(data)
      .execute(); */

  serializer(data: PersonsEntity) {
    delete data.location.id;
    delete data.origin.id;
    return { ...data, episodes: data.episodes.map((item) => item.url) };
  }
}
