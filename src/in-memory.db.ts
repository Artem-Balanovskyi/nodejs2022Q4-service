import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './albums/entities/album.entity';
import { ArtistEntity } from './artists/entities/artist.entity';
import { FavoritesEntity } from './favorites/entities/favorite.entity';
import { TrackEntity } from './tracks/entities/track.entity';
import { UserEntity } from './users/entities/user.entity';

@Injectable()
export class InMemoryDB {

    public users: UserEntity[] = [
        {
            "id": "9a76c653-8128-41bb-acfe-dd9f7eae209d",
            "login": "First User",
            "password": "password",
            "version": 1,
            "createdAt": 1675619886292,
            "updatedAt": null
        },
        {
            "id": "5a76c653-8128-41bb-acfe-dd9f7eae110d",
            "login": "Second User",
            "password": "password",
            "version": 1,
            "createdAt": 1675619886573,
            "updatedAt": null
        }

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
