import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { ArtistEntity } from './entities/artist.entity';
import { ARTIST_NOT_FOUND } from 'src/utils/messages';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    private db: InMemoryDB,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create(dto: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuidv4(),
      ...dto,
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistEntity[] {
    return this.db.artists;
  }

  findOne(id: string): ArtistEntity {
    const artist: ArtistEntity | null = this.db.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throwException(ARTIST_NOT_FOUND, 404);
    else {
      return artist;
    }
  }

  update(id: string, dto: UpdateArtistDto): ArtistEntity {
    const artist: ArtistEntity | null = this.findOne(id);
    const { name, grammy } = { ...dto };
    if (name !== undefined) artist.name = name;
    if (grammy !== undefined) artist.grammy = grammy;
    return artist;
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    this.favoritesService.removeArtist(id);
    this.albumsService.deleteArtistId(id);
    this.tracksService.deleteArtistId(id);
  }
}
