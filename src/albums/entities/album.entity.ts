import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
@Entity('Album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string | null; // refers to Artist
}
