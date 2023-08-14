import { useQuery } from '@tanstack/react-query';
import styles from '../movies/MoviesList.module.css';

import { getSearchedMovies } from '../../api/movies';
import { useParams } from 'react-router-dom';
import { MovieProps } from '../../props/MoviesProps';
import MovieCard from '../../components/movieCard/MovieCard';
import Container from '../../components/container/Container';
import Title from '../../components/title/Title';
import { FadeLoader } from 'react-spinners';

const Search = () => {
  const {} = useParams();
  const queryParameters = new URLSearchParams(window.location.search);
  const title = queryParameters.get('title');

  const { isLoading, data: movies } = useQuery({
    queryKey: ['search', String(title)],
    queryFn: () => getSearchedMovies(String(title)),
    retry: 0,
  });

  if (isLoading) return <FadeLoader className="spinner" color="#36d7b7" />;

  return (
    <Container width="800px">
      <Title> Search results by: {title}</Title>
      <div className={styles.moviesWrapper}>
        {movies.length ? movies.map((movie: MovieProps) => <MovieCard key={movie.id} props={{ ...movie }} />) : <div> Results not found</div>}
      </div>
    </Container>
  );
};

export default Search;
