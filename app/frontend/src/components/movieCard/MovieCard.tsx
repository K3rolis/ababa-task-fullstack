import { useContext } from 'react';
import styles from './MovieCard.module.css';
import { MovieProps } from '../../props/MoviesProps';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEdit, AiFillStar } from 'react-icons/ai';
import { LoginContext } from '../../contexts/LoginContext';
import { GetUserId } from '../JwtTokenData';

type Props = {
  props: MovieProps;
  handleDelete?: (id: number) => void;
};
const MovieCard = ({ handleDelete, props }: Props) => {
  const { auth } = useContext(LoginContext);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageBox}>
          <img className={styles.image} src={props.imageUrl} alt={props.title} />
        </div>
        <div className={styles.movieContent}>
          <span className={styles.title}>{props.title}</span>
          <div className={styles.metaData}>
            <div className={styles.ratingBox}>
              <AiFillStar className={styles.star} />
              <span className={styles.rating}>{props.rating}</span>
            </div>
            <span className={styles.releaseDate}>{props.releasedYear}</span>
          </div>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
      {auth.isLoggedIn && GetUserId() === props.userId && (
        <div className={styles.actions}>
          <Link to={`/movies/edit/${props.id}`} title="Edit">
            <AiFillEdit className={styles.icon} />
          </Link>

          <button onClick={() => handleDelete!(props.id!)} title="Delete">
            <AiFillDelete className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
