import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);

    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );

    await seedDataBase();
  });

  const seedDataBase = async () => {
    repository.clear();
    albumList = [];
    for (let i = 0; i < 10; i++) {
      const album: AlbumEntity = await repository.save({
        nombre: faker.lorem.word(),
        caratula: faker.image.url(),
        fechaLanzamiento: faker.date.past(),
        desc: faker.lorem.lines(),
      });
      albumList.push(album);
    }
  };

  it('should create a new album', async () => {
    const newAlbum: AlbumEntity = {
      id: '',
      nombre: faker.lorem.word(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      desc: faker.lorem.lines(),
      performers: [],
      tracks: [],
    };

    const inserted = await service.create(newAlbum);
    expect(inserted).not.toBeNull();
  });
  it('should throw an error when creating a new album', async () => {
    const newAlbum: AlbumEntity = {
      id: '',
      nombre: faker.lorem.word(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      desc: '',
      performers: [],
      tracks: [],
    };

    await expect(service.create(newAlbum)).rejects.toHaveProperty(
      'message',
      'Album description cannot be empty',
    );
  });

  it('should return 10 albums', async () => {
    const albums = await service.findAll();
    expect(albums.length).toEqual(10);
  });

  it('should retrieve the first album', async () => {
    const album = await service.findOne(albumList[0].id);

    expect(album).not.toBeNull();
    expect(album.id).toEqual(albumList[0].id);
  });

  it('should not retrieve any album', async () => {
    await expect(service.findOne('id invalido')).rejects.toHaveProperty(
      'message',
      'Album was not found',
    );
  });

  it('should delete the album', async () => {
    const album = albumList.pop();

    await service.delete(album.id);

    const retireved = await service.findAll();

    expect(retireved.length).toEqual(9);
  });

  it('should not delete any album', async () => {
    await expect(service.delete('id invalido')).rejects.toHaveProperty(
      'message',
      'Album was not found',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
