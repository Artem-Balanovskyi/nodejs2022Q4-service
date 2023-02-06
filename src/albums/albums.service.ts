import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { AlbumEntity } from './entities/album.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ALBUM_NOT_FOUND } from 'src/utils/messages';

@Injectable()
export class AlbumsService {
  constructor(
    private db: InMemoryDB,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create(dto: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      id: uuidv4(),
      ...dto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): AlbumEntity[] {
    return this.db.albums;
  }

  findOne(id: string): AlbumEntity {
    const album: AlbumEntity | null = this.db.albums.find(
      (album) => album.id === id,
    );
    if (!album) throwException(ALBUM_NOT_FOUND, 404);
    else {
      return album;
    }
  }

  update(id: string, dto: UpdateAlbumDto): AlbumEntity {
    const album: AlbumEntity | null = this.findOne(id);
    const { name, year, artistId } = { ...dto };
    if (name !== undefined) album.name = name;
    if (year !== undefined) album.year = year;
    if (artistId !== undefined) album.artistId = artistId;
    return album;
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    this.favoritesService.removeAlbum(id);
    this.tracksService.deleteAlbumId(id);
  }

  deleteArtistId(id: string) {
    this.db.albums.forEach((item, index) => {
      if (item.artistId === id) {
        item.artistId = null;
        this.db.albums[index] = item;
      }
    });
  }
}
