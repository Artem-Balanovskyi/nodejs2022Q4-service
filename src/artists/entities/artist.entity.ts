import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
  BeforeRemove,
} from 'typeorm';
@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  @JoinColumn({ referencedColumnName: 'artistId' })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  @JoinColumn({ referencedColumnName: 'artistId' })
  tracks: TrackEntity[];

  @ManyToMany(() => FavoritesEntity, (favorite) => favorite.artists, {
    cascade: true,
  })
  @JoinTable()
  favoriteArtists: ArtistEntity[];

  @BeforeRemove()
  async removeTrackFromFavorites() {
    const [favorites] = await FavoritesEntity.find();

    const index = favorites.artistsId.indexOf(this.id);

    if (index >= 0) {
      favorites.artistsId.splice(index, 1);
      await favorites.save();
    }
  }
}
