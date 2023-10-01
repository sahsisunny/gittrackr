import { FC } from 'react';

import Layout from '@/components/Layout';
import Accordion from '@/components/Accordion';

import { FaqQnA } from '@/mocks/faqMock';
import styles from '@/styles/faq.module.css';

const FrequentlyAskedQuestion: FC = () => {
  return (
    <Layout title="GitTrackr | FAQ">
      <div className={styles.accordionSection}>
        <h1 className={styles.sectionHeading}>Frequently Asked Questions</h1>
        <div className={styles.faqContainer}>
          {FaqQnA.map((element, index) => (
            <div className={styles.faq} key={element.id}>
              <Accordion
                answer={element.answer}
                question={element.question}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FrequentlyAskedQuestion;
