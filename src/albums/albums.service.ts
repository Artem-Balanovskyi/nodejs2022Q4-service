import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { throwException } from 'src/utils/throwException';
import { AlbumEntity } from './entities/album.entity';
import { ALBUM_NOT_FOUND } from 'src/utils/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const createdAlbum: AlbumEntity = this.albumRepository.create({ ...dto });
    return await this.albumRepository.save(createdAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOne(albumId: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: albumId } });
    if (album) return album;
    throwException(ALBUM_NOT_FOUND, 404);
  }

  async update(albumId: string, dto: UpdateAlbumDto): Promise<AlbumEntity> {
    const updatedAlbum: AlbumEntity = await this.albumRepository.findOne({ where: { id: albumId } });
    if (!updatedAlbum) throwException(ALBUM_NOT_FOUND, 404);
    Object.assign(updatedAlbum, dto)
    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(albumId: string): Promise<void> {
    const result = await this.albumRepository.delete(albumId);

    if (result.affected === 0) {
      throwException(ALBUM_NOT_FOUND, 404);
    }
  }
}
