import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  it('Should create a new album', async () => {
    const newAlbum: AlbumEntity = {
      id: '',
      nombre: faker.lorem.word(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      desc: faker.lorem.lines(),
    };

    const inserted = await service.create(newAlbum);
    expect(inserted).not.toBeNull();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
