import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {
    this.favoritesService.create();
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.addArtist(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.addTrack(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.favoritesService.removeTrack(id);
  }
}
