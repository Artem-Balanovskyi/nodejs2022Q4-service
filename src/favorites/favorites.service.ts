import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { throwException } from 'src/utils/throwException';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { ENTITY_NOT_FOUND, ENTITY_ADDED } from 'src/utils/messages';
import { FavoritesEntity } from './entities/favorite.entity';

const repositories = {
  tracks: 'tracksRepository',
  albums: 'albumsRepository',
  artists: 'artistsRepository',
};
@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    const ids = { artists: [], albums: [], tracks: [] };
    const allFavorites = await this.favoritesRepository.find();
    allFavorites.forEach((obj) => {
      if (obj.entity === 'artists') return ids.artists.push(obj.entityId);
      if (obj.entity === 'albums') return ids.albums.push(obj.entityId);
      if (obj.entity === 'tracks') return ids.tracks.push(obj.entityId);
    });
    const result = { artists: [], albums: [], tracks: [] };
    for (const field in repositories) {
      result[field] = await this[repositories[field]].findByIds(ids[field]);
    }
    return result;
  }

  async addEntityById(entityId: string, entityName: string): Promise<void> {
    const allEntities = await this[repositories[entityName]].find();
    const entity = allEntities.find(({ id }) => id === entityId);
    if (!entity) throwException(ENTITY_NOT_FOUND(entityName), 422);
    await this.favoritesRepository.save({ entityId, entity: entityName });
    throwException(ENTITY_ADDED(entityName), 201);
  }

  async deleteEntityById(entityId: string) {
    await this.favoritesRepository.delete({ id: entityId });
  }
}
