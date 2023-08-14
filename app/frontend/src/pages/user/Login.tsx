import { useState } from 'react';
import { LoginProps } from '../../props/UserProps';
import { useMutation } from '@tanstack/react-query';
import { signin } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/login/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  const signinMutation = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      setError('Credentials wrong');
    },
  });

  const handleLogin = (user: LoginProps) => {
    signinMutation.mutate(user);
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default Login;
