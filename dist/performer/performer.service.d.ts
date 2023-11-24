import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
export declare class PerformerService {
    private readonly performerRepository;
    private readonly albumRepository;
    constructor(performerRepository: Repository<PerformerEntity>, albumRepository: Repository<AlbumEntity>);
    create(performer: PerformerEntity): Promise<PerformerEntity>;
    findOne(id: string): Promise<PerformerEntity>;
    findAll(): Promise<PerformerEntity[]>;
    addPerformerToAlbum(albumId: string, performerId: string): Promise<PerformerEntity>;
}
