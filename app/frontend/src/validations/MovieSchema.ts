import * as yup from 'yup';

const nextYear = new Date().getFullYear() + 1;

export const movieSchema = yup.object().shape({
  title: yup.string().required('This field is required').min(3, 'Must be atleast 3 characters'),
  rating: yup
    .number()
    .typeError('You must specify a number')
    .required('This field is required')
    .min(0, 'Must be greater than or equal to 0')
    .max(10, 'Must be less than or equal to 10'),
  releasedYear: yup
    .number()
    .required('This field is required')
    .min(1888, 'Must be greater than 1888')
    .max(nextYear, `Are you from future? Must be less or equal to ${nextYear} `),
  description: yup.string().required('This field is required').min(10, 'Must be atleast 10 characters').trim(),
  imageUrl: yup.string().required('This field is required'),
});
