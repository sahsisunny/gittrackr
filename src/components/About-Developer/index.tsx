import React, { FC } from 'react';
import Image from 'next/image';

import styles from './about-developer.module.css';
import { AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { aboutDevelopersMock } from '@/mocks/aboutDeveloperMock';

const AboutDeveloper: FC = () => {
  return (
    <div className={styles.aboutDeveloper__Container}>
      <h1 className={styles.aboutDeveloper__title}>About Developers</h1>
      <div className={styles.developer__timeline}>
        {aboutDevelopersMock.map((developer) => (
          <React.Fragment key={developer.id}>
            <div className={`${styles.container} ${styles[developer.side]}`}>
              <div className={styles.content}>
                <div className={styles.cardContainer}>
                  <div>
                    <Image
                      src={developer.developerImage}
                      alt={developer.developerName}
                      width={150}
                      height={150}
                      className={styles.nameAndImage}
                    />
                  </div>

                  <div className={styles.introduction}>
                    <h4>{developer.developerName}</h4>
                    <p>{developer.developerIntro}</p>
                    <div className={styles.socialMediaLinks}>
                      <span>
                        <a
                          href={developer.developerGithubId}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithubSquare className={`${styles.socialMedia}`} />
                        </a>
                      </span>
                      <span>
                        <a
                          href={developer.developerTwitterId}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillTwitterSquare
                            className={`${styles.socialMedia}`}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href={developer.developerLinkedInId}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillLinkedin className={`${styles.socialMedia}`} />
                        </a>
                      </span>
                      <span>
                        <a
                          href={developer.developerPortfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsFillPersonFill
                            className={`${styles.socialMedia}`}
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AboutDeveloper;
