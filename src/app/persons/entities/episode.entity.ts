import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'episodes' })
export class EpisodesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  url: string;
}
