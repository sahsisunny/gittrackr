import { FC } from 'react';
import Layout from '@/components/Layout';
import Accordion from '@/components/Accordion';
import { FaqQnA } from '@/mocks/faqMock';
import styles from '@/styles/faq.module.css';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FaqQnA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const FrequentlyAskedQuestion: FC = () => {
  return (
    <Layout
      title="GitTrackr | Frequently Asked Questions & Developer FAQ"
      description="Find answers to common questions about GitTrackr: GitHub tracking, privacy, security, Real Dev Squad origin, and live demo mode."
      jsonLd={faqJsonLd}
    >
      <main className={styles.accordionSection}>
        <h1 className={styles.sectionHeading}>Frequently Asked Questions</h1>
        <p className={styles.sectionSubheading}>
          Answers to common questions about GitTrackr capabilities, permissions, privacy, organizations, and team velocity.
        </p>

        <section className={styles.faqContainer} aria-label="Frequently Asked Questions">
          {FaqQnA.map((element, index) => (
            <Accordion
              key={element.id}
              answer={element.answer}
              question={element.question}
              index={index}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default FrequentlyAskedQuestion;
