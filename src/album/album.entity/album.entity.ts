import { PerformerEntity } from '../../performer/performer.entity/performer.entity';
import { TrackEntity } from '../../track/track.entity/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  caratula: string;

  @Column()
  fechaLanzamiento: Date;

  @Column()
  desc: string;

  @ManyToMany(() => PerformerEntity, (performer) => performer.albums)
  @JoinTable()
  performers: PerformerEntity[];

  @OneToMany(() => TrackEntity, (track) => track.album)
  @JoinTable()
  tracks: TrackEntity[];
}
