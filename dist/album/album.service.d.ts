import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<AlbumEntity>);
    create(album: AlbumEntity): Promise<AlbumEntity>;
    findOne(id: string): Promise<AlbumEntity>;
    findAll(): Promise<AlbumEntity[]>;
    delete(id: string): Promise<void>;
}
