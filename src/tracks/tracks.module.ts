import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB]
})
export class TracksModule {}
