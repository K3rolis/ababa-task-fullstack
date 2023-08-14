export type UserRegisterProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type UserProps = {
  username: string;
  email: string;
  password: string;
};

export type JwtPayload = {
  username: string | null;
  email: string;
  sub: number;
};
