import { AlbumEntity } from 'src/album/album.entity/album.entity';
export declare class PerformerEntity {
    id: string;
    nombre: string;
    imagen: string;
    desc: string;
    albums: AlbumEntity[];
}
