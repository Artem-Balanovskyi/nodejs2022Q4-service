import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('Artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];
}
