import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonsEntity } from './persons.entity';

@Entity({ name: 'origins' })
export class OriginEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => PersonsEntity, (person) => person.origin)
  persons: PersonsEntity[];
}
