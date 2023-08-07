import React from 'react';
import InputField from '../../inputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../../validations/LoginSchema';
import { SubmitButton } from '../../buttons/Buttons';
import { LoginProps } from '../../../props/UserProps';
import Container from '../../container/Container';
import Title from '../../title/Title';
import AuthRedirect from '../../AuthRedirect';
import ErrorField from '../../errors/ErrorField';

type Props = {
  onSubmit: (user: LoginProps) => void;
  error: string;
};
const Login = ({ onSubmit, error }: Props) => {
  const { register, handleSubmit } = useForm<LoginProps>({ resolver: yupResolver(loginSchema) });

  const onLogin = (user: LoginProps) => {
    onSubmit(user);
  };

  return (
    <Container width="400px">
      <Title>Login form</Title>
      <form onSubmit={handleSubmit(onLogin)}>
        <InputField type="text" label="Username" name="username" register={register} required />
        <InputField type="password" label="password" name="password" register={register} required />
        {error && <ErrorField>{error}</ErrorField>}
        <AuthRedirect label="Don't have account?" link="register" linkText="Sign up" />

        <SubmitButton>Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default Login;
