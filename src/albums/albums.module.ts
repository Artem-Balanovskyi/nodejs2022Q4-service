import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB]
})
export class AlbumsModule {}
