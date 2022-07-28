import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonsEntity } from './persons.entity';

@Entity({ name: 'locations' })
export class LocationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  url: string;

  @OneToMany(() => PersonsEntity, (person) => person.location)
  persons: PersonsEntity[];
}
