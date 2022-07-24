import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EpisodesEntity } from './episode.entity';
import { LocationsEntity } from './location.entity';
import { OriginEntity } from './origin.entity';

@Entity({ name: 'persons' })
export class PersonsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  status: string;

  @Column()
  species: string;

  @Column()
  type: string;

  @Column()
  gender: string;

  @ManyToOne(() => OriginEntity, (origin) => origin.persons)
  origin: OriginEntity;

  @ManyToOne(() => LocationsEntity, (location) => location.persons)
  location: LocationsEntity;

  @Column()
  image: string;

  @ManyToMany(() => EpisodesEntity)
  @JoinTable()
  episodes: EpisodesEntity[];

  @Column()
  url: string;

  @Column()
  created: string;
}
