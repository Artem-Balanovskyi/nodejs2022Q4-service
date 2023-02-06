import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';


@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDB]
})
export class ArtistsModule {}
