import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB],
  exports: [AlbumsService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule)
  ]
})
export class AlbumsModule { }
