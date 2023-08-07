import React, { useContext } from 'react';
import RegisterForm from '../../components/forms/register/RegisterForm';
import { UserRegisterProps } from '../../props/UserProps';
import { createUser } from '../../api/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

const Register = () => {
  const { setAuth } = useContext(LoginContext);
  const navigate = useNavigate();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully');
      navigate('/');
    },
  });

  const handleNewUser = (user: UserRegisterProps) => {
    const UserData = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    setAuth({
      username: user.username,
      isLoggedIn: true,
    });
    createUserMutation.mutate(UserData);
  };

  return <RegisterForm onSubmit={handleNewUser}></RegisterForm>;
};

export default Register;
