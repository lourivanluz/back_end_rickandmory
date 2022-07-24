import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { PersonsEntity } from 'src/app/persons/entities/persons.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ManyToMany(() => PersonsEntity)
  @JoinTable()
  favorites: PersonsEntity[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
