import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/albums/:id')
  @HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/albums/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('/artists/:id')
  @HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artists/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Post('/tracks/:id')
  @HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(id);
  }
  
  @Delete('/tracks/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeTrack(id);
  }
  
}
