import { FC } from 'react';
import Layout from '@/components/Layout';
import Accordion from '@/components/Accordion';
import { helpQnAMock } from '@/mocks/helpQnQ.mock';
import styles from '@/styles/help.module.css';

const helpJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: helpQnAMock.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.replace(/\n+/g, ' ').trim(),
    },
  })),
};

const Help: FC = () => {
  return (
    <Layout
      title="GitTrackr | Documentation, Troubleshooting & Setup Guide"
      description="Step-by-step guides for troubleshooting organization visibility, connecting GitHub accounts, and optimizing your team workflow in GitTrackr."
      jsonLd={helpJsonLd}
    >
      <main className={styles.accordionSection} id="faq">
        <h1 className={styles.sectionHeading}>Help & Guide</h1>
        <p className={styles.sectionSubheading}>
          Everything you need to know about setting up, configuring, and maximizing your workflow with GitTrackr.
        </p>

        <section className={styles.faqContainer} aria-label="Help and Guide topics">
          {helpQnAMock.map((help, index) => (
            <Accordion
              key={help.id}
              question={help.question}
              answer={help.answer}
              index={index}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default Help;
