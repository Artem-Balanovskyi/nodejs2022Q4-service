import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {

  constructor(private db: InMemoryDB) { }

  create(dto: CreateTrackDto) {
    const newTrack: TrackEntity = {
      id: uuidv4(),
      ...dto
    }
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): TrackEntity[] {
    return this.db.tracks;
  }

  findOne(id: string): TrackEntity {
    const track: TrackEntity | null = this.db.tracks.find(track => track.id === id);
    if (!track) throwException(`Track with id: ${id} was not found.`, 404);
    else {
      return track;
    }
  }

  update(id: string, dto: UpdateTrackDto): TrackEntity | null {
    const track: TrackEntity | null = this.findOne(id);
    const { name, artistId, albumId, duration } = { ... dto};
    if (name !== undefined) track.name = name;
    if (artistId !== undefined) track.artistId = artistId;  
    if (albumId !== undefined) track.albumId = albumId;  
    if (duration !== undefined) track.duration = duration;  
    return track;
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.tracks = this.db.tracks.filter(track => track.id !== id);
  }
}
