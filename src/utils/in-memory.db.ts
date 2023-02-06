import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

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
    public tracks: TrackEntity[] = [
        {
            "id": "a218efeb-0e75-43e1-ab30-376176b58113",
            "name": "First Track",
            "artistId": "11a54795-c2bf-4e6d-bb68-9aa23c7e572a",
            "albumId": "5a76c653-8128-41bb-acfe-dd9f7eae110d",
            "duration": 5
        }
    ];
    public artists: ArtistEntity[] = [
        {
            "id": "11a54795-c2bf-4e6d-bb68-9aa23c7e572a",
            "name": "First Artist",
            "grammy": true
        },
        {
            "id": "51fe95fd-2702-4c3b-a749-f7bff2ebfbb8",
            "name": "Second Artist",
            "grammy": false
        }
    ];
    public albums: AlbumEntity[] = [
        {
            "id": "240f33c4-979a-4da1-b8b5-7618f27ec400",
            "name": "First Album",
            "year": 2020,
            "artistId": "5a76c653-8128-41bb-acfe-dd9f7eae110d"
        }
    ];
    public favorites: FavoritesEntity = {
        artists: [],
        albums: [],
        tracks: [],
    };

}
