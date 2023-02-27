import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string | null;

  @Column({ type: 'integer' })
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;
}
