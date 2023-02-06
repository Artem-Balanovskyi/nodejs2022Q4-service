import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";

export class FavResEntity {
    albums: AlbumEntity[];
    artists: ArtistEntity[];
    tracks: TrackEntity[];
}