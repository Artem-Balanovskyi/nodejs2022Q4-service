import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favorite.entity';
import { AlbumEntity } from '../albums//entities/album.entity';
import { ArtistEntity } from '../artists//entities/artist.entity';
import { TrackEntity } from '../tracks//entities/track.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
  imports: [TypeOrmModule.forFeature([FavoritesEntity, AlbumEntity, ArtistEntity, TrackEntity])]
})
export class FavoritesModule {}
