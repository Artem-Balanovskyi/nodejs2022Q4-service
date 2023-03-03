import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { throwException } from 'src/utils/throwException';
import { ArtistEntity } from './entities/artist.entity';
import { ARTIST_NOT_FOUND } from 'src/utils/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(dto: CreateArtistDto): Promise<ArtistEntity> {
    const createdArtist: ArtistEntity = this.artistRepository.create({
      ...dto,
    });
    return await this.artistRepository.save(createdArtist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOne(artistId: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (artist) return artist;
    throwException(ARTIST_NOT_FOUND, 404);
  }

  async update(artistId: string, dto: UpdateArtistDto): Promise<ArtistEntity> {
    const updatedArtist: ArtistEntity = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!updatedArtist) throwException(ARTIST_NOT_FOUND, 404);
    Object.assign(updatedArtist, dto);
    return await this.artistRepository.save(updatedArtist);
  }

  async remove(artistId: string): Promise<void> {
    const result = await this.artistRepository.delete(artistId);

    if (result.affected === 0) {
      throwException(ARTIST_NOT_FOUND, 404);
    }
  }
}
