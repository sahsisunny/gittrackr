import { FC } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Accordion from '@/components/Accordion';

import { FaqQnA } from '@/mocks/faqMock';

import styles from '@/styles/faq.module.css';

const FrequentlyAskedQuestion: FC = () => {
  return (
    <>
      <Head>
        <title>GitTrackr | FAQ</title>
      </Head>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default FrequentlyAskedQuestion;
