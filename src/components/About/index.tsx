import { FC } from 'react';

import styles from './about.module.css';
import { aboutMock } from '@/mocks/aboutMock';

const About: FC = () => {
  return (
    <div className={styles.about} id="about">
      <h2 className={styles.sectionHeading}>
        About <span>GitTrackr</span>
      </h2>
      {aboutMock.map((element) => (
        <div className={styles.aboutText} key={element.id}>
          <p className={styles.aboutTextHeading}>{element.title}</p>
          <p className={styles.aboutTextParagraph}>{element.description}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
