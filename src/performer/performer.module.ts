import { Module } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

@Module({
  providers: [PerformerService],
  imports: [TypeOrmModule.forFeature([PerformerEntity, AlbumEntity])],
})
export class PerformerModule {}
