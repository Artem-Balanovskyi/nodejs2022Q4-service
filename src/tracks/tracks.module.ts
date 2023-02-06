import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB],
  exports: [TracksService],
  imports: [
    forwardRef(() => FavoritesModule)
  ]
})
export class TracksModule { }
