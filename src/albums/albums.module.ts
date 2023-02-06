import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB, FavoritesService, TracksService, ArtistsService]
})
export class AlbumsModule {}
