import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an Promise', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      let beforeDelete: number;
      let afterDelete: number;
      service
        .create({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        })
        .then(() => {
          beforeDelete = service.count();
        })
        .then(() => {
          service.deleteOne(1);
        })
        .then(() => {
          afterDelete = service.count();
        })
        .then(() => {
          expect(afterDelete).toBeLessThan(beforeDelete);
        });
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate: number = service.count();
      let afterCreate: number;

      service
        .create({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        })
        .then(() => {
          afterCreate = service.count();
        })
        .then(() => {
          expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });

      service
        .getOne(1)
        .then(v => v.title)
        .then(title => {
          expect(title).toEqual('Updated Test');
        });
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
