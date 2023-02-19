import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
@Entity('Artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;
}
