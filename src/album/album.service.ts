import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { PerformerEntity } from '../performer/performer.entity/performer.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
  ) {}

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.nombre) {
      throw new BusinessLogicException(
        'Album name cannot be empty',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (!album.desc) {
      throw new BusinessLogicException(
        'Album description cannot be empty',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.albumRepository.save(album);
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['performers'],
    });

    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return album;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async delete(id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }

    if (album.tracks) {
      throw new BusinessLogicException(
        'Album cannot be deleted because it has tracks',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    await this.albumRepository.remove(album);
  }

  async addPerformerToAlbum(albumId: string, performerId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['performers'],
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const performer = await this.performerRepository.findOne({
      where: { id: performerId },
      relations: ['albums'],
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

    album.performers.push(performer);

    return await this.albumRepository.save(album);
  }
}
