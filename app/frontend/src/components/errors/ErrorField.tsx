import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ErrorField = ({ children }: Props) => {
  return <span style={{ color: 'red', margin: '0' }}>{children}</span>;
};

export default ErrorField;
