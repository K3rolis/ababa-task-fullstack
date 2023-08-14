import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type Auth = {
  username: string | null;
  isLoggedIn: boolean;
};

export interface LoginContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

type LoginProviderProps = {
  children: ReactNode;
};

export const LoginContext = createContext<LoginContextInterface>({} as LoginContextInterface);

export const LoginContextProvider = ({ children }: LoginProviderProps) => {
  const [auth, setAuth] = useState<Auth>({
    username: '',
    isLoggedIn: false,
  });
  return <LoginContext.Provider value={{ auth, setAuth }}>{children}</LoginContext.Provider>;
};
