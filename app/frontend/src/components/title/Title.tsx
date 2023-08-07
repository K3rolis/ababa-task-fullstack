import React, { ReactNode } from 'react';
import styles from './Title.module.css';

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return <span className={styles.title}>{children}</span>;
};

export default Title;
