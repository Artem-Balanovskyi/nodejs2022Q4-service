import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './ormconfig';
import { DataSource, DataSourceOptions } from 'typeorm';

const typeOrmConfig = {
  imports: [ConfigModule.forRoot({ load: [database] })],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get('database'),
  dataSourceFactory: async (options: DataSourceOptions) =>
    new DataSource(options).initialize(),
};
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
    AlbumsModule,
  ],
})
export class AppModule {}
