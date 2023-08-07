import { useContext, useState } from 'react';
import styles from './MoviesList.module.css';
import classes from '../../components/buttons/Buttons.module.css';
import Container from '../../components/container/Container';
import { deleteMovie, getMovies } from '../../api/movies';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MovieProps } from '../../props/MoviesProps';
import MovieCard from '../../components/movieCard/MovieCard';
import { LinkButton } from '../../components/buttons/Buttons';
import Title from '../../components/title/Title';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

const MoviesList = () => {
  const [moviesDesc, setMoviesDesc] = useState<boolean>(false);
  const { auth } = useContext(LoginContext);
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    data: movies,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  const deleteMovieMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      refetch();
      toast.success('Movie was deleted Successfully!');
    },
    onError: () => {
      toast.error('Something Went Wrong Try Again');
      navigate(`/notFound`);
    },
  });

  const handleDelete = (id: number) => {
    if (!auth.isLoggedIn) {
      deleteMovieMutation.mutate(id);
    } else {
      navigate('/*');
    }
  };

  if (isLoading) return <FadeLoader className="spinner" color="#36d7b7" />;

  console.log(movies);

  // const moviesSorted = movies.toReversed();

  return (
    <Container width="800px">
      <Title>Movies</Title>
      <div className={styles.header}>
        <span className={styles.hidden}></span>

        <div className={styles.sortingBox}>
          <span className={styles.sort}>Sort By Title</span>
          {moviesDesc ? (
            <AiOutlineArrowUp className={styles.icon} onClick={() => setMoviesDesc(false)} />
          ) : (
            <AiOutlineArrowDown className={styles.icon} onClick={() => setMoviesDesc(true)} />
          )}
        </div>

        {auth.isLoggedIn && (
          <LinkButton className={`${styles.button} ${classes.outline}`}>
            <Link to={'/movies/create'}>Create New</Link>
          </LinkButton>
        )}
      </div>
      <div className={styles.moviesWrapper}>
        {movies.length ? (
          movies.map((movie: MovieProps) => <MovieCard key={movie.id} props={{ ...movie }} handleDelete={handleDelete} />)
        ) : (
          <Title>Results not found</Title>
        )}
      </div>
    </Container>
  );
};

export default MoviesList;
