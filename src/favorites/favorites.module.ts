import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDB } from 'src/utils/in-memory.db';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDB]
})
export class FavoritesModule {}
