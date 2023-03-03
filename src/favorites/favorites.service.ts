import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { FavoritesRepsonse } from './favorites.response'

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoriteRepository: Repository<FavoritesEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) { }

  async findAll() {
    const [favorites] = await this.favoriteRepository.find();

    const albums = await this.albumRepository.findBy({
      id: In(favorites.albumsIds),
    });

    const artists = await this.artistRepository.findBy({
      id: In(favorites.artistsId),
    });

    const tracks = await this.trackRepository.findBy({
      id: In(favorites.tracksIds),
    });

    const res = new FavoritesRepsonse({
      tracks,
      albums,
      artists,
    });

    return res;
  }

  async create() {
    const [favorites] = await this.favoriteRepository.find();
    if (favorites) return;
    const favorite = this.favoriteRepository.create({});
    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: string) {
    await this.albumRepository.findOneByOrFail({ id }).catch(() => {
      throw new UnprocessableEntityException();
    });

    const [favorites] = await this.favoriteRepository.find();

    if (favorites.albumsIds.includes(id)) {
      throw new ConflictException(`This album is already in favorites`);
    }

    favorites.albumsIds.push(id);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

  async addArtist(id: string) {
    await this.artistRepository.findOneByOrFail({ id }).catch(() => {
      throw new UnprocessableEntityException();
    });

    const [favorites] = await this.favoriteRepository.find();

    if (favorites.artistsId.includes(id)) {
      throw new ConflictException(`This artist is already in favorites`);
    }

    favorites.artistsId.push(id);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

  async addTrack(id: string) {
    await this.trackRepository.findOneByOrFail({ id }).catch(() => {
      throw new UnprocessableEntityException();
    });

    const [favorites] = await this.favoriteRepository.find();

    if (favorites.tracksIds.includes(id)) {
      throw new ConflictException(`This track is already in favorites`);
    }

    favorites.tracksIds.push(id);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

  async removeAlbum(id: string) {
    const [favorites] = await this.favoriteRepository.find();

    const index = favorites.albumsIds.indexOf(id);

    if (index < 0) {
      throw new UnprocessableEntityException();
    }

    favorites.albumsIds.splice(index, 1);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

  async removeArtist(id: string) {
    const [favorites] = await this.favoriteRepository.find();

    const index = favorites.artistsId.indexOf(id);

    if (index < 0) {
      throw new UnprocessableEntityException();
    }

    favorites.artistsId.splice(index, 1);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

  async removeTrack(id: string) {
    const [favorites] = await this.favoriteRepository.find();

    const index = favorites.tracksIds.indexOf(id);

    if (index < 0) {
      throw new UnprocessableEntityException();
    }

    favorites.tracksIds.splice(index, 1);

    await this.favoriteRepository.update(favorites.id, favorites);
  }

}
