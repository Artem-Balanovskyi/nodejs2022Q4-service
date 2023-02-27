import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Column,
  JoinTable,
  BaseEntity,
} from 'typeorm';

@Entity('favorites')
export class FavoritesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, default: [] })
  albumsIds: string[];

  @Column('text', { array: true, default: [] })
  artistsId: string[];

  @Column('text', { array: true, default: [] })
  tracksIds: string[];

  @ManyToMany(() => AlbumEntity, (album) => album.favoriteAlbums)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity, (artist) => artist.favoriteArtists)
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.favoriteTracks)
  @JoinTable()
  tracks: TrackEntity[];
}
