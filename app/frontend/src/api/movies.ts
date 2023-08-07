import axios from 'axios';
import { API_URL } from '../configs/config';
import { MovieProps } from '../props/MoviesProps';

export const createMovie = async (newMovie: MovieProps) => {
  return await axios.post(`${API_URL}/movies`, newMovie);
};

export const updateMovie = async ({ id, ...movie }: MovieProps) => {
  return await axios.put(`${API_URL}/movies/${id}`, movie);
};

export const getMovie = async (id: number) => {
  return await axios.get(`${API_URL}/movies/${id}`).then((res) => res.data);
};

export const getMovies = async () => {
  return await axios.get(`${API_URL}/movies`).then((res) => res.data);
};

export const getMoviesAsc = async () => {
  return await axios.get(`${API_URL}/movies?_sort=title&_order_asc`).then((res) => res.data);
};

export const getMoviesDesc = async () => {
  return await axios.get(`${API_URL}/movies?_sort=title&_order_desc`).then((res) => res.data);
};

export const deleteMovie = async (id: number) => {
  return await axios.delete(`${API_URL}/movies/${id}`);
};

export const getSearchedMovies = async (search: string) => {
  return await axios.get(`${API_URL}/movies?q=${search}`).then((res) => res.data);
};
