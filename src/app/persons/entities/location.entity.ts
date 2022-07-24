import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonsEntity } from './persons.entity';

@Entity({ name: 'locations' })
export class LocationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => PersonsEntity, (person) => person.location)
  persons: PersonsEntity[];
}
