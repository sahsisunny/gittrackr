import { FC, useState } from 'react';

import styles from './faq.module.css';
import { qNa } from '@/constants/faqMock';
import { showAccordionProp } from '@/types/Faq.types';

const Faq: FC = () => {
  const [showAccordions, setShowAccordions] = useState<showAccordionProp>({});

  const toggleAccordion = (index: number) => {
    setShowAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {qNa.map((ele, index) => (
          <div className={styles.faq} key={ele.id}>
            <div
              className={styles.faqTitle}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className={styles.question}>{ele.question}</h3>
              <button
                type="button"
                className={
                  (styles.faqBtn,
                  `${
                    showAccordions[index]
                      ? styles.faqBtnShow
                      : styles.faqBtnHide
                  }`)
                }
                onClick={() => toggleAccordion(1)}
              ></button>
            </div>
            <div
              className={`${showAccordions[index] ? styles.show : styles.hide}`}
            >
              <p className={styles.answer}>{ele.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
