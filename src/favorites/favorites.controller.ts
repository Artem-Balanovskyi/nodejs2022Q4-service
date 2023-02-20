import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

const requests = {
  track: 'tracks',
  album: 'albums',
  artist: 'artists',
};

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('/:entity/:id')
  @HttpCode(201)
  async addEntityById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('entity') entity: 'artist' | 'track' | 'album',
  ): Promise<void> {
    await this.favoritesService.addEntityById(id, requests[entity]);
  }

  @Delete('/:entity/:id')
  @HttpCode(204)
  async deleteEntityById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    await this.favoritesService.deleteEntityById(id);
  }
}
