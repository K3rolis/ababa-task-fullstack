import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required().min(6, 'Atleast 6 characters').max(20, 'Must be at most 20 characters'),
  email: yup.string().email('Must be valid Email').required(),
  password: yup.string().required().min(6, 'Atleast 6 characters').max(20, 'Must be at most 20 characters'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
