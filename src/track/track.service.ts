import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import {
  BusinessLogicException,
  BusinessError,
} from 'src/shared/errors/business-errors';
import { TrackEntity } from './track.entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(albumId: string, track: TrackEntity): Promise<TrackEntity> {
    if (track.duracion < 0) {
      throw new BusinessLogicException(
        'Track duration cannot be negative',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }
    track.album = album;
    return await this.trackRepository.save(track);
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      where: { id },
    });

    if (!track) {
      throw new BusinessLogicException(
        'Track was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return track;
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }
}
