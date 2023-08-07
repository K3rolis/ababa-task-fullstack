import React, { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister, UseFormUnregister } from 'react-hook-form';
import styles from './FormInput.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  rows?: number;
  type?: 'number' | 'text' | 'password' | 'email';
}

const InputField: React.FC<InputProps> = ({ label, register, required, rows, type, name }) => {
  return (
    <div className={styles.inputGroup}>
      {rows ? (
        <textarea className={styles.input} {...register(name, { required })} rows={rows} required></textarea>
      ) : (
        <input type={type} className={styles.input} {...register(name, { required })} required />
      )}
      <label className={styles.label}> {label}</label>
    </div>
  );
};

export default InputField;
