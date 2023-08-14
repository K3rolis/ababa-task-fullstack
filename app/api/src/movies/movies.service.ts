import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { SearchParams, TMovie } from './types';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  createMovie(data: TMovie, userId: number): Promise<Movie> {
    if (data.userId !== userId) throw new ForbiddenException('Access Denied');

    return this.prisma.movie.create({ data });
  }

  async getMovies(params: any) {
    if (params.order === 'desc' || params.order === 'asc') {
      return await this.prisma.movie.findMany({
        orderBy: {
          title: params.order,
        },
      });
    } else {
      return await this.prisma.movie.findMany();
    }
  }

  async getMovie(id: number) {
    return await this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async editMovie(id: number, userId: number): Promise<Movie> {
    const movie = await this.getMovie(id);

    if (!movie) {
      throw new NotFoundException('Not Found');
    } else if (movie.userId !== userId) {
      throw new ForbiddenException('Access Denied');
    } else {
      return movie;
    }
  }

  async updateMovie(id: number, data: TMovie, userId: number): Promise<Movie> {
    if (!userId || data.userId !== userId)
      throw new ForbiddenException('Access Denied');

    return this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMovie(id: number, userId: number): Promise<Movie> {
    const movie = await this.getMovie(id);
    if (!userId || movie.userId !== userId)
      throw new ForbiddenException('Access Denied');

    return this.prisma.movie.delete({
      where: { id },
    });
  }

  async searchMovies(param: SearchParams) {
    const movies = await this.prisma.movie.findMany({
      where: {
        title: {
          search: param.title.split(' ').join(' & '),
        },
      },
    });
    return movies;
  }
}
