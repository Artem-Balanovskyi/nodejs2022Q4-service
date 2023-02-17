import { Injectable, Module } from '@nestjs/common';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  public users: UserEntity[] = [
    {
      id: '54c8ca76-89c9-4bef-8dd2-0af8e59f9be3',
      login: 'Artem',
      password: 'password',
      version: 1,
      createdAt: 1232,
      updatedAt: 12323,
    },
  ];
  public tracks: TrackEntity[] = [];
  public artists: ArtistEntity[] = [];
  public albums: AlbumEntity[] = [];
  public favorites: FavoritesEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
@Module({
  providers: [InMemoryDB],
  exports: [InMemoryDB],
})
export class DB_Module {}
