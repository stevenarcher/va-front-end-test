'use client';
import styles from './filter-option.module.scss';
import { ChangeEvent } from 'react';

type FilterOptionProps = {
  children: React.ReactNode;
  amount: number;
  name: string;
};
export default async function FilterOption({ children, amount, name }: FilterOptionProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { form } = event.target;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div className={styles.option}>
      <input type="checkbox" name={name} onChange={handleChange} />
      {children}
      <span className={styles.count}>({amount})</span>
    </div>
  );
}
