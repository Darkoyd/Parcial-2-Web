import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { plainToInstance } from 'class-transformer';
import { TrackEntity } from './track.entity/track.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptor/busines-errors/busines-errors.interceptor';

@Controller('track')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':trackId')
  async findOne(@Param('trackId') id: string) {
    return await this.trackService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    const { albumId, ...trackDto } = body;
    const track = plainToInstance(TrackEntity, trackDto);
    return await this.trackService.create(albumId, track);
  }
}
