import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieType } from './entities/movie.db';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Promise<MovieType> {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Promise<MovieType> {
    return this.moviesService.getOne(movieId);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
