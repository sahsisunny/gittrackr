import { FC } from 'react';

import { PRFiltersList } from '@/mocks/dashboardMock';

import styles from './dashboard.module.css';
import { PRFilterSectionProps } from '@/types/dashboard.type';

const PRFilterSection: FC<PRFilterSectionProps> = ({ filterPrs }) => {
  console.log('inside PRFIlterSection component');
  return (
    <>
      {PRFiltersList.map((filter) => (
        <label className={styles.radio} key={filter.id}>
          <input
            type="radio"
            name="radio-two"
            defaultChecked
            onChange={() => {
              filterPrs(filter.arg);
            }}
          />
          <span className={styles.name}>{filter.name}</span>
        </label>
      ))}
    </>
  );
};

export default PRFilterSection;
