import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity/album.entity';

@Injectable()
export class PerformerService {
  constructor(
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(performer: PerformerEntity): Promise<PerformerEntity> {
    if (performer.desc.length > 100) {
      throw new BusinessLogicException(
        'Description is too long, max 100 chars',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.performerRepository.save(performer);
  }

  async findOne(id: string): Promise<PerformerEntity> {
    const performer = this.performerRepository.findOne({ where: { id } });
    if (!performer) {
      throw new BusinessLogicException(
        'Performer was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return performer;
  }

  async findAll(): Promise<PerformerEntity[]> {
    return await this.performerRepository.find();
  }

  async addPerformerToAlbum(albumId: string, performerId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const performer = this.performerRepository.findOne({
      where: { id: performerId },
    });
    if (!performer) {
      throw new BusinessLogicException(
        'Performer was not found',
        BusinessError.NOT_FOUND,
      );
    }

    if (album.performers.length > 3) {
      throw new BusinessLogicException(
        'Album cannot have more than 3 performers',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return performer;
  }
}
