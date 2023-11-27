import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity/performer.entity';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performerList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);

    repository = module.get<Repository<PerformerEntity>>(
      getRepositoryToken(PerformerEntity),
    );

    await seedDataBase();
  });

  const seedDataBase = async () => {
    repository.clear();
    performerList = [];

    for (let i = 0; i < 10; i++) {
      const performer: PerformerEntity = await repository.save({
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        desc: faker.lorem.paragraph(),
      });
      performerList.push(performer);
    }
  };

  it('should create a performer', async () => {
    const newPerformer: PerformerEntity = {
      id: '',
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      desc: 'Description',
      albums: [],
    };

    const inserted = await service.create(newPerformer);
    expect(inserted).not.toBeNull();
  });

  it('should not create a performer with a very long description', async () => {
    const newPerformer: PerformerEntity = {
      id: '',
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      desc: faker.lorem.paragraphs(10),
      albums: [],
    };

    await expect(service.create(newPerformer)).rejects.toHaveProperty(
      'message',
      'Description is too long, max 100 chars',
    );
  });

  it('should find a performer with ID', async () => {
    const searched = await service.findOne(performerList[0].id);

    expect(searched).not.toBeNull();
    expect(searched.id).toEqual(performerList[0].id);
  });

  it('should not find a performer', async () => {
    const find = await service.findOne('id invalido');
    expect(find).toBeNull();
  });

  it('should find all performers', async () => {
    const performers = await service.findAll();
    expect(performers.length).toEqual(10);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
