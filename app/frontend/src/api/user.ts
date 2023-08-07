import axios from 'axios';
import { API_URL } from '../configs/config';
import { UserRegisterProps } from '../props/UserProps';

export const createUser = async (newUser: UserRegisterProps) => {
  return await axios.post(`${API_URL}/users`, newUser);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`).then((res) => res.data);
};
