import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
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
}
