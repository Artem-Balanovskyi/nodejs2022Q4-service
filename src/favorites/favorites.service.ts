import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { throwException } from 'src/utils/throwException';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  ALBUM_ADDED,
  ALBUM_NOT_FOUND,
  ARTIST_ADDED,
  ARTIST_NOT_FOUND,
  TRACK_ADDED,
  TRACK_NOT_FOUND,
} from 'src/utils/messages';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDB) {}

  findAll() {
    const albums: AlbumEntity[] = this.db.albums.filter((album) =>
      this.db.favorites.albums.includes(album.id),
    );
    const artists: ArtistEntity[] = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );
    const tracks: TrackEntity[] = this.db.tracks.filter((track) =>
      this.db.favorites.tracks.includes(track.id),
    );
    return {
      albums,
      tracks,
      artists,
    };
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (album) {
      this.db.favorites.albums.push(album.id);
      return { message: ALBUM_ADDED };
    }
    throwException(ALBUM_NOT_FOUND, 422);
  }

  removeAlbum(id: string) {
    const index = this.db.favorites.albums.findIndex((album) => album === id);
    if (index >= 0) {
      this.db.favorites.albums.splice(index, 1);
    }
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (artist) {
      this.db.favorites.artists.push(artist.id);
      return { message: ARTIST_ADDED };
    }
    throwException(ARTIST_NOT_FOUND, 422);
  }

  removeArtist(id: string) {
    const index = this.db.favorites.artists.findIndex(
      (artist) => artist === id,
    );
    if (index >= 0) {
      this.db.favorites.artists.splice(index, 1);
    }
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (track) {
      this.db.favorites.tracks.push(track.id);
      return { message: TRACK_ADDED };
    }
    throwException(TRACK_NOT_FOUND, 422);
  }

  removeTrack(id: string) {
    const index = this.db.favorites.tracks.findIndex((track) => track === id);
    if (index >= 0) {
      this.db.favorites.tracks.splice(index, 1);
    }
  }
}
