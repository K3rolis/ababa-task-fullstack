import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesDto } from './dtos/movies.dto';
import { MoviesService } from './movies.service';
import { GetCurrentUserId, Public } from 'src/auth/common/decorators';
import { Movie } from '@prisma/client';
import { OrderParams, SearchParams } from './types';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post('create')
  createMovie(
    @Body() dto: MoviesDto,
    @GetCurrentUserId() userId: number,
  ): Promise<Movie> {
    return this.moviesService.createMovie(dto, userId);
  }

  @Public()
  @Get()
  getMovies(@Query() orderBy: OrderParams) {
    return this.moviesService.getMovies(orderBy);
  }

  @Get('edit/:id')
  editMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @GetCurrentUserId() userId: number,
  ): Promise<Movie> {
    return this.moviesService.editMovie(movieId, userId);
  }

  @Put('/:id')
  updateMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: MoviesDto,
    @GetCurrentUserId() userId: number,
  ): Promise<Movie> {
    console.log(dto);
    return this.moviesService.updateMovie(movieId, dto, userId);
  }

  @Delete('/:id')
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
  ): Promise<Movie> {
    return this.moviesService.deleteMovie(id, userId);
  }

  @Public()
  @Get('search')
  searchMovies(@Query() query: SearchParams) {
    return this.moviesService.searchMovies(query);
  }
}
