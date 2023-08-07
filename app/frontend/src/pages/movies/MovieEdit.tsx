import React from 'react';
import MovieForm from '../../components/forms/movie/MovieForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMovie, updateMovie } from '../../api/movies';
import { MovieProps } from '../../props/MoviesProps';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

const MovieEdit = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    data: movie,
  } = useQuery({
    queryKey: ['recipe', Number(movieId)],
    queryFn: () => getMovie(Number(movieId)),
  });

  const updateMovieMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      refetch();
      toast.success('Movie was edited Successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Something Went Wrong Try Again');
      navigate(`/notFound`);
    },
  });

  if (isLoading) return <FadeLoader className="spinner" color="#36d7b7" />;

  const handleSubmit = (movie: MovieProps) => {
    updateMovieMutation.mutate({
      id: Number(movieId),
      ...movie,
    });
  };

  return <MovieForm onSubmit={handleSubmit} initialValues={movie}></MovieForm>;
};

export default MovieEdit;
