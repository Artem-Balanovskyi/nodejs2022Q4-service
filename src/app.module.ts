import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
    AlbumsModule,
  ],
})
export class AppModule {}
