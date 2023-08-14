import axios from 'axios';
import { API_URL } from '../configs/config';
import { LoginProps, UserRegisterProps } from '../props/UserProps';

export const createUser = (newUser: UserRegisterProps) => {
  return axios.post(`${API_URL}/auth/signup`, newUser);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`).then((res) => res.data);
};

export const signin = async (user: LoginProps) => {
  return await axios.post(`${API_URL}/auth/signin`, user);
};

export const logout = async () => {
  return await axios.post(`${API_URL}/auth/logout`);
};

export const refreshTokens = async () => {
  // return await axios.post(`${API_URL}/auth/refresh`, { headers: { Authorization: `Bearer ${refreshToken()}` } });
};
