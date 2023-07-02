import { FC, useState } from 'react';

import { AccordionProps, showAccordionProp } from '@/types/accordion.types';
import styles from './accordion.module.css';

const Accordion: FC<AccordionProps> = ({ question, answer, index }) => {
  const [showAccordions, setShowAccordions] = useState<showAccordionProp>({});

  const toggleAccordion = (index: number) => {
    setShowAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <div className={styles.faqTitle} onClick={() => toggleAccordion(index)}>
        <h3 className={styles.question}>{question}</h3>
        <button
          type="button"
          className={
            (styles.faqBtn,
            `${showAccordions[index] ? styles.faqBtnShow : styles.faqBtnHide}`)
          }
          onClick={() => toggleAccordion(1)}
        ></button>
      </div>
      <div className={`${showAccordions[index] ? styles.show : styles.hide}`}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </>
  );
};

export default Accordion;
