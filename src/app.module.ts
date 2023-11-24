import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { PerformerModule } from './performer/performer.module';
import { PerformerEntity } from './performer/performer.entity/performer.entity';
import { AlbumEntity } from './album/album.entity/album.entity';
import { TrackEntity } from './track/track.entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    PerformerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'marketplace',
      entities: [PerformerEntity, TrackEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
