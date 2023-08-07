import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviesDto } from './dtos/movies.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  createMovie(data: MoviesDto): Promise<Movie> {
    return this.prisma.movie.create({ data });
    // console.log(test);
  }

  getMovies() {
    return this.prisma.movie.findMany();
  }

  editMovie(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  updateMovie(id: number, data: MoviesDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteMovie(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
