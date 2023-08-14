import Container from '../container/Container';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <Container>
      <div className={styles.errorBox}>
        <div className={styles.error}>
          <h1>Page Not Found</h1>
          <p style={{ marginBlock: '30px' }}>
            Get Back to{' '}
            <Link to="/" className={styles.home}>
              HOME
            </Link>{' '}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
