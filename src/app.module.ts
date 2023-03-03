import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CustomExceptionFilter } from './logger/custom-exception.filter';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

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
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
    AlbumsModule,
    LoggerModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
