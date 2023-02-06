import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';


@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDB, AlbumsService, FavoritesService, TracksService]
})
export class ArtistsModule {}
