import axios from 'axios';
import { API_URL } from '../configs/config';
import { MovieProps } from '../props/MoviesProps';

export const createMovie = (newMovie: MovieProps) => {
  // axios.post(`${API_URL}/auth/refresh`);

  return axios.post(`${API_URL}/movies/create`, newMovie);
};

export const updateMovie = async ({ id, ...movie }: MovieProps) => {
  return await axios.put(`${API_URL}/movies/${id}`, movie);
};

export const getMovie = async (id: number) => {
  return await axios.get(`${API_URL}/movies/edit/${id}`).then((res) => res.data);
};

export const getMovies = async (order: string) => {
  return await axios.get(`${API_URL}/movies?order=${order}`).then((res) => res.data);

  // return await axios.get(`${API_URL}/movies`, { headers: { Authorization: null } }).then((res) => res.data);
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
  return await axios.get(`${API_URL}/movies/search?title=${search}`).then((res) => res.data);
};
