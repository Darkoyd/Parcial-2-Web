import { AlbumEntity } from '../../album/album.entity/album.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PerformerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  imagen: string;

  @Column()
  desc: string;

  @ManyToMany(() => AlbumEntity, (album) => album.performers)
  @JoinTable()
  albums: AlbumEntity[];
}
