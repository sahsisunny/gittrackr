import { FC } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import styles from '@/styles/help.module.css';
import { helpQnAMock } from '@/mocks/helpQnQ.mock';
import Accordion from '@/components/Accordion';

const Help: FC = () => {
  return (
    <div>
      <Head>
        <title>GitTrackr | Help & FAQ</title>
      </Head>
      <Navbar />

      <div className={styles.accordionSection} id="faq">
        <h2 className={styles.sectionHeading}>Help & FAQ</h2>
        <div className={styles.faqContainer}>
          {helpQnAMock.map((help, index) => (
            <div className={styles.faq} key={help.id}>
              <Accordion
                question={help.question}
                answer={help.answer}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
