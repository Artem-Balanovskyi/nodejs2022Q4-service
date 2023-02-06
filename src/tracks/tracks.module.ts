import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB, FavoritesService, AlbumsService, ArtistsService]
})
export class TracksModule {}
