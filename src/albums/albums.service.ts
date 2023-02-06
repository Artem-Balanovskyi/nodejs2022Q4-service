import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {

  constructor(private db: InMemoryDB) { }
  
  create(dto: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      id: uuidv4(),
      ...dto
    }
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): AlbumEntity[] {
    return this.db.albums;
  }

  findOne(id: string): AlbumEntity {
    const album: AlbumEntity | null = this.db.albums.find(album => album.id === id);
    if (!album) throwException(`Album with id: ${id} was not found.`, 404);
    else {
      return album;
    }
  }

  update(id: string, dto: UpdateAlbumDto): AlbumEntity {
    const album: AlbumEntity | null = this.findOne(id);
    const { name, year, artistId } = { ... dto};
    if (name !== undefined) album.name = name;
    if (year !== undefined) album.year = year;  
    return album;
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.albums = this.db.albums.filter(album => album.id !== id);
  }
}
