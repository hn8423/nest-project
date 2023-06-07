import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import db, { MovieType } from './entities/movie.db';
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  async getAll(): Promise<MovieType> {
    const allData = await db.getData('/movieArray');
    return allData;
  }

  async getOne(id: number): Promise<MovieType> {
    const len = await db.count('/movieArray');
    if (len < +id) {
      throw new NotFoundException(`Movie with ID ${+id} not found.`);
    }
    const index = await db.getIndex('/movieArray', +id);

    return db.getData(`/movieArray[${index}]`);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteOne(id: number) {
    await this.getOne(id);
    const index = await db.getIndex('/movieArray', +id);

    await db.delete(`/movieArray[${index}]`);
    return this.getAll();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(movieData: CreateMovieDto) {
    const len = await db.count('/movieArray');
    db.push(
      '/movieArray[]',
      {
        id: len + 1,
        ...movieData,
      },
      true,
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(id: number, updateData: UpdateMovieDto) {
    const movie = await this.getOne(id);
    // this.deleteOne(id);
    db.push('/movieArray[]', { ...movie, ...updateData }, true);
  }

  count(): number {
    let answerCount = 0;
    db.count('/movieArray').then((v): number => {
      answerCount = v;
      return;
    });
    return answerCount;
  }
}
