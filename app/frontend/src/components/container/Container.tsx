import React, { ReactNode } from 'react';
import styles from './Container.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  width?: string;
};

const Container = ({ children, className, width }: Props) => {
  return (
    <div className={`${styles.container} ${className}`} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export default Container;
