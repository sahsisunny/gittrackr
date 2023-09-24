import React, { FC } from 'react';

import styles from './dashboard.module.css';

import { FilterSectionProps } from '@/types/dashboard.type';
import { dashboardFilters } from '@/mocks/dashboardMock';

const FilterSection: FC<FilterSectionProps> = ({ filterIssues }) => {
  return (
    <>
      {dashboardFilters.map((filter) => (
        <label className={styles.radio} key={filter.id}>
          <input
            type="radio"
            name="radio-two"
            defaultChecked
            onChange={() => {
              filterIssues(filter.arg);
            }}
          />
          <span className={styles.name}>{filter.name}</span>
        </label>
      ))}
    </>
  );
};

export default FilterSection;
