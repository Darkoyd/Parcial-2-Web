import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
import { TrackEntity } from 'src/track/track.entity/track.entity';
export declare class AlbumEntity {
    id: string;
    nombre: string;
    caratula: string;
    fechaLanzamiento: Date;
    desc: string;
    performers: PerformerEntity[];
    tracks: TrackEntity[];
}
