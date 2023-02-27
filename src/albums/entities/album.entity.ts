import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  BeforeRemove,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (album) => album.artist)
  @JoinColumn({ referencedColumnName: 'albumId' })
  tracks: TrackEntity[];

  @ManyToMany(() => FavoritesEntity, (favorite) => favorite.albums, {
    cascade: true,
  })
  @JoinTable()
  favoriteAlbums: AlbumEntity[];

  @BeforeRemove()
  async removeTrackFromFavorites() {
    const [favorites] = await FavoritesEntity.find();

    const index = favorites.albumsIds.indexOf(this.id);

    if (index >= 0) {
      favorites.albumsIds.splice(index, 1);
      await favorites.save();
    }
  }
}
