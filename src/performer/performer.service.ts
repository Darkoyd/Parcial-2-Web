import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class PerformerService {
  constructor(
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
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
    const performer = await this.performerRepository.findOne({
      where: { id },
      relations: ['albums'],
    });
    console.log(performer);
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
}
