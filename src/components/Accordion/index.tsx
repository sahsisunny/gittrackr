import React, { FC } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { AccordionProps } from '@/types/accordion.types';
import styles from './accordion.module.css';

const Accordion: FC<AccordionProps> = ({ question, answer }) => {
  return (
    <details className={styles.accordionItem}>
      <summary className={styles.accordionSummary}>
        <span>{question}</span>
        <FiChevronDown className={styles.summaryIcon} aria-hidden="true" />
      </summary>
      <div className={styles.accordionContent}>
        {answer}
      </div>
    </details>
  );
};

export default Accordion;
