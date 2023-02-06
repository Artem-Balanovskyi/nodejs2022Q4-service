import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { DB_Module } from './utils/in-memory.db';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, ArtistsModule, TracksModule, FavoritesModule, AlbumsModule, DB_Module]
})
export class AppModule {}
