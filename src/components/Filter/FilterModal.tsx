import React, { FC } from 'react';
import styles from './filter.module.css';

const FilterModal: FC = () => {
  return (
    <>
      <dialog className={styles.modalContainer}>
        <div className={styles.insideModalContainer}>
          <div className="options">
            <input
              type="checkbox"
              name="openPr"
              id="filter"
              className="filterClass"
              style={{ marginRight: '1rem' }}
            />
            <label htmlFor="filter">All</label>
          </div>
          <div className="options">
            <input
              type="checkbox"
              name="openPr"
              id="filter"
              className="filterClass"
              style={{ marginRight: '1rem' }}
            />
            <label htmlFor="filter">Open</label>
          </div>
          <div className="options">
            <input
              type="checkbox"
              name="openPr"
              id="filter"
              className="filterClass"
              style={{ marginRight: '1rem' }}
            />
            <label htmlFor="filter">Close</label>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FilterModal;
