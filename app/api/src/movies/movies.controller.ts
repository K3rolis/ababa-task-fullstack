import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesDto } from './dtos/movies.dto';
import { MoviesService } from './movies.service';
import { Public } from 'src/auth/common/decorators';
import { Movie } from '@prisma/client';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Public()
  @Post('create')
  createMovie(@Body() dto: MoviesDto): Promise<Movie> {
    return this.moviesService.createMovie(dto);
  }

  @Public()
  @Get()
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Public()
  @Get('edit/:id')
  editMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.editMovie(id);
  }

  @Public()
  @Put('/:id')
  updateMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: MoviesDto,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(movieId, dto);
  }

  @Public()
  @Delete('/:id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.deleteMovie(id);
  }
}
