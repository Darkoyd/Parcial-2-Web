import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerDto } from './performer.dto/performer.dto';
import { plainToInstance } from 'class-transformer';
import { PerformerEntity } from './performer.entity/performer.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptor/busines-errors/busines-errors.interceptor';

@Controller('performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Get()
  async findAll() {
    return await this.performerService.findAll();
  }

  @Get(':performerId')
  async findOne(@Param('performerId') id: string) {
    return await this.performerService.findOne(id);
  }

  @Post()
  async create(@Body() performerDto: PerformerDto) {
    const performer: PerformerEntity = plainToInstance(
      PerformerEntity,
      performerDto,
    );
    return await this.performerService.create(performer);
  }
}
