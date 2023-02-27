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
} from 'typeorm';

@Entity('Favorite')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  entity: string;

  @Column()
  entityId: string;

  @ManyToMany(() => ArtistEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tracks: TrackEntity[];
}
