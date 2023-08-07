import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  link: string;
  linkText: string;
};

const Test = ({ label, link, linkText }: Props) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <span>{label} </span>
      <Link to={`/${link}`} style={{ color: '#9fd3c7', fontWeight: '700' }}>
        {linkText}
      </Link>
    </div>
  );
};

export default Test;
