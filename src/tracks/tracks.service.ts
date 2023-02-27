import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { throwException } from 'src/utils/throwException';
import { TrackEntity } from './entities/track.entity';
import { TRACK_NOT_FOUND } from 'src/utils/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(dto: CreateTrackDto): Promise<TrackEntity> {
    const createdTrack: TrackEntity = this.trackRepository.create({ ...dto });
    return await this.trackRepository.save(createdTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findOne(trackId: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (track) return track;
    throwException(TRACK_NOT_FOUND, 404);
  }

  async update(trackId: string, dto: UpdateTrackDto): Promise<TrackEntity> {
    const updatedTrack: TrackEntity = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!updatedTrack) throwException(TRACK_NOT_FOUND, 404);
    Object.assign(updatedTrack, dto);
    return await this.trackRepository.save(updatedTrack);
  }

  async remove(trackId: string): Promise<void> {
    const result = await this.trackRepository.delete(trackId);

    if (result.affected === 0) {
      throwException(TRACK_NOT_FOUND, 404);
    }
  }
}
