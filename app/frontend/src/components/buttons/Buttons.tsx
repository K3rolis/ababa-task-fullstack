import React, { ReactNode } from 'react';
import styles from './Buttons.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  style?: HTMLStyleElement;
};

export const SubmitButton = ({ children }: Props) => {
  return (
    <div className={styles.buttonBox}>
      <button className={styles.submitButton} type="submit">
        {children}
      </button>
    </div>
  );
};

export const LinkButton = ({ children, className }: Props) => {
  return <button className={`${styles.linkButton} ${className}`}>{children}</button>;
};
