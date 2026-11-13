import { FC } from 'react';
import { FiInfo } from 'react-icons/fi';
import styles from './about.module.css';
import { aboutMock } from '@/mocks/aboutMock';

const About: FC = () => {
  return (
    <section className={styles.about} id="about" aria-label="About GitTrackr">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <FiInfo aria-hidden="true" />
          <span>Why GitTrackr</span>
        </div>
        <h2 className={styles.sectionHeading}>
          Built for Velocity. <span>Designed for Clarity.</span>
        </h2>
        <p className={styles.sectionSubheading}>
          Eliminate context-switching friction and stay in flow with a centralized mission control
          for your code reviews and issues.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        {aboutMock.map((element, idx) => (
          <article className={styles.aboutCard} key={element.id}>
            <div className={styles.aboutCardNumber}>0{idx + 1}</div>
            <h3 className={styles.aboutCardTitle}>{element.title}</h3>
            <p className={styles.aboutCardParagraph}>{element.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;
