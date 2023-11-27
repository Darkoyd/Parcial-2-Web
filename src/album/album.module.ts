import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from '../performer/performer.entity/performer.entity';
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, PerformerEntity])],
  controllers: [AlbumController],
})
export class AlbumModule {}
