import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeRemove,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('tracks')
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

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;

  @ManyToMany(() => FavoritesEntity, (favorite) => favorite.tracks, {
    cascade: true,
  })
  @JoinTable()
  favoriteTracks: TrackEntity[];

  @BeforeRemove()
  async removeTrackFromFavorites() {
    const [favorites] = await FavoritesEntity.find();

    const index = favorites.tracksIds.indexOf(this.id);

    if (index >= 0) {
      favorites.tracksIds.splice(index, 1);
      await favorites.save();
    }
  }
}
