/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { PerformerEntity } from '../../performer/performer.entity/performer.entity';
import { TrackEntity } from '../../track/track.entity/track.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AlbumEntity, TrackEntity, PerformerEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([AlbumEntity, TrackEntity, PerformerEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
