import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../../inputField/InputField';
import { registerSchema } from '../../../validations/RegisterSchema';
import { SubmitButton } from '../../buttons/Buttons';
import Container from '../../container/Container';
import { UserRegisterProps } from '../../../props/UserProps';
import Title from '../../title/Title';
import AuthRedirect from '../../AuthRedirect';
import ErrorField from '../../errors/ErrorField';

type Props = {
  onSubmit: (user: UserRegisterProps) => void;
};

const RegisterForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onRegister = async (user: UserRegisterProps) => {
    const isValid = await registerSchema.isValid(user);

    if (isValid) {
      onSubmit(user);
    }
  };

  return (
    <div>
      <Container width="400px">
        <Title>Register form</Title>

        <form onSubmit={handleSubmit(onRegister)}>
          <InputField type="text" label="Username" name="username" register={register} required />
          {errors.username && <ErrorField>{errors.username?.message}</ErrorField>}
          <InputField type="text" label="Email" name="email" register={register} required />
          {errors.email && <ErrorField>{errors.email?.message}</ErrorField>}

          <InputField type="password" label="Password" name="password" register={register} required />
          {errors.password && <ErrorField>{errors.password?.message}</ErrorField>}

          <InputField type="password" label="Confirm Password" name="confirmPassword" register={register} required />
          {errors.confirmPassword && <ErrorField>{errors.confirmPassword?.message}</ErrorField>}

          <AuthRedirect label="Already have account? " link="login" linkText="Sign in" />

          <SubmitButton>Register</SubmitButton>
        </form>
      </Container>
    </div>
  );
};

export default RegisterForm;
