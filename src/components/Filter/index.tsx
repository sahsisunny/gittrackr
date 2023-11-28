import { FC, useState } from 'react';
import styles from './filter.module.css';
import { AiFillFilter } from 'react-icons/ai';
import FilterModal from './FilterModal';

const FilterComponent: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handlefilterClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className={styles.filter__component} onClick={handlefilterClick}>
        <button className={styles.filter__button}>
          <AiFillFilter className={styles.filterIcon} />
          Filters
        </button>
      </div>
      <div
        className={showModal ? `${styles.openModal}` : `${styles.closeModal}`}
      >
        <FilterModal />
      </div>
    </>
  );
};

export default FilterComponent;
