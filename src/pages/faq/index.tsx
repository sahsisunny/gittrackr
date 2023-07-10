import { FC } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

import Accordion from '@/components/Accordion';

import styles from '@/styles/faq.module.css';

import { FaqQnA } from '@/mocks/faqMock';

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
