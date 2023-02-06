import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {

  constructor(private db: InMemoryDB) { }

  create(dto: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuidv4(),
      ...dto
    }
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistEntity[] {
    return this.db.artists;
  }

  findOne(id: string): ArtistEntity {
    const artist: ArtistEntity | null = this.db.artists.find(artist => artist.id === id);
    if (!artist) throwException(`User with id: ${id} was not found.`, 404);
    else {
      return artist;
    }
  }

  update(id: string, dto: UpdateArtistDto) {
    const artist = this.findOne(id);
    artist.name = dto.name;
    artist.grammy = dto.grammy;    
    return artist;
  }


  remove(id: string) {
    this.findOne(id);
    this.db.artists = this.db.artists.filter(artist => artist.id !== id);
  }
}
