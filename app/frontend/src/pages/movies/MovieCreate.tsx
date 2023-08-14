import MovieForm from '../../components/forms/movie/MovieForm';
import { useMutation } from '@tanstack/react-query';
import { createMovie } from '../../api/movies';
import { MovieProps } from '../../props/MoviesProps';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetUserId } from '../../components/JwtTokenData';

const MovieCreate = () => {
  const navigate = useNavigate();
  const createMovieMutation = useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      toast.success('Movie was created Successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Something Went Wrong Try Again');
      navigate(`/notFound`);
    },
  });
  const handleSubmit = (movie: MovieProps) => {
    movie.userId = GetUserId();

    createMovieMutation.mutate({ ...movie });
  };
  return <MovieForm onSubmit={handleSubmit} initialValues={{} as MovieProps}></MovieForm>;
};

export default MovieCreate;
