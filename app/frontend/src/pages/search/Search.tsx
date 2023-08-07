import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styles from '../movies/MoviesList.module.css';

import { getSearchedMovies } from '../../api/movies';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieProps } from '../../props/MoviesProps';
import MovieCard from '../../components/movieCard/MovieCard';
import Container from '../../components/container/Container';
import Title from '../../components/title/Title';
import { FadeLoader } from 'react-spinners';

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();

  if (!search) {
    navigate('/');
  }

  const { isLoading, data: movies } = useQuery({
    queryKey: ['search', String(search)],
    queryFn: () => getSearchedMovies(String(search)),
  });

  if (isLoading) return <FadeLoader className="spinner" color="#36d7b7" />;

  return (
    <Container width="800px">
      <Title> Search results by: {search}</Title>
      <div className={styles.moviesWrapper}>
        {movies.length ? movies.map((movie: MovieProps) => <MovieCard key={movie.id} props={{ ...movie }} />) : <div> Results not found</div>}
      </div>
    </Container>
  );
};

export default Search;
