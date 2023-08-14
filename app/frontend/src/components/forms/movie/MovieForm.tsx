import InputField from '../../inputField/InputField';
import Container from '../../container/Container';
import styles from './MovieForm.module.css';
import { SubmitButton } from '../../buttons/Buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import { MovieProps } from '../../../props/MoviesProps';
import { movieSchema } from '../../../validations/MovieSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import Title from '../../title/Title';
import ErrorField from '../../errors/ErrorField';

type Props = {
  onSubmit: (movie: MovieProps) => void;
  initialValues: MovieProps;
};

const MovieForm = ({ onSubmit, initialValues }: Props) => {
  const form = useForm<MovieProps>({
    defaultValues: initialValues,
    resolver: yupResolver(movieSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onCreateMovie: SubmitHandler<MovieProps> = async (movie: MovieProps) => {
    const isValid = await movieSchema.isValid(movie);
    if (isValid) {
      onSubmit(movie);
    }
  };

  return (
    <Container width="600px">
      <Title>New Movie</Title>

      <form className={styles.form} onSubmit={handleSubmit(onCreateMovie)}>
        <InputField type="text" label="title" name="title" register={register} required />
        {errors.title && <ErrorField>{errors.title?.message}</ErrorField>}

        <InputField type="text" label="Image URL" name="imageUrl" register={register} required />
        {errors.imageUrl && <ErrorField>{errors.imageUrl?.message}</ErrorField>}

        <div className={styles.formGroup}>
          <div>
            <InputField type="text" label="rating" name="rating" register={register} required />
            {errors.rating && <ErrorField>{errors.rating?.message}</ErrorField>}
          </div>

          <div>
            <InputField type="number" label="released Year" name="releasedYear" register={register} required />
            {errors.releasedYear && <ErrorField>{errors.releasedYear?.message}</ErrorField>}
          </div>
        </div>

        <InputField rows={5} label="Description" name="description" register={register} required />
        {errors.description && <ErrorField>{errors.description?.message}</ErrorField>}

        <SubmitButton>Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default MovieForm;
