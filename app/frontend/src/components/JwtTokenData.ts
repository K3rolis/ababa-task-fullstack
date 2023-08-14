import { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from '../props/UserProps';

export const SetUsername = (token: string) => {
  const { setAuth } = useContext(LoginContext);

  const cookiesData = Cookies.get(token);

  useEffect(() => {
    if (cookiesData) {
      const data = jwtDecode<JwtPayload>(cookiesData);
      setAuth({
        username: data.username,
        isLoggedIn: true,
      });
    } else {
      setAuth({
        username: null,
        isLoggedIn: false,
      });
    }
  }, [cookiesData, setAuth]);
};

export const GetUserId = () => {
  const cookiesData = Cookies.get('token');

  if (cookiesData) {
    const data = jwtDecode<JwtPayload>(cookiesData);

    return Number(data.sub);
  }
};

export const GetAccessToken = () => {
  return Cookies.get('token');
};
