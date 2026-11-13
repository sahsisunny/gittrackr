import React, { FC } from 'react';
import Image from 'next/image';
import {
  FiCode,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiExternalLink,
} from 'react-icons/fi';

import styles from './about-developer.module.css';
import { aboutDevelopersMock } from '@/mocks/aboutDeveloperMock';

const AboutDeveloper: FC = () => {
  const developer = aboutDevelopersMock[0];

  if (!developer) return null;

  return (
    <section className={styles.developersSection} id="developers" aria-label="About the Developer">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <FiCode aria-hidden="true" />
          <span>About the Developer</span>
        </div>
        <h2 className={styles.sectionHeading}>
          Built by <span>Sunny Sahsi</span>
        </h2>
        <p className={styles.sectionSubheading}>
          A simple, lightweight open-source tool created to easily view, filter, and track your GitHub pull requests, issues, and activity in one place.
        </p>
      </div>

      <div className={styles.developersContainer}>
        <article className={styles.developerCard}>
          {/* Header: Avatar + Name + Role Badge */}
          <div className={styles.devHeaderRow}>
            <div className={styles.devImageWrapper}>
              <Image
                src={developer.developerImage}
                alt={developer.developerName}
                width={96}
                height={96}
                className={styles.devAvatar}
                priority
              />
            </div>

            <div className={styles.devHeaderInfo}>
              <div className={styles.roleBadge}>
                <FiCode size={13} aria-hidden="true" />
                <span>{developer.developerRole}</span>
              </div>

              <h3 className={styles.devName}>
                <span>{developer.developerName}</span>
              </h3>
            </div>
          </div>

          {/* Simple Intro */}
          <p className={styles.devIntro}>{developer.developerIntro}</p>

          {/* Skills & Focus Chips */}
          {developer.developerSkills && developer.developerSkills.length > 0 && (
            <div className={styles.skillsRow}>
              {developer.developerSkills.map((skill, idx) => (
                <span key={idx} className={styles.skillChip}>
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Footer: Social Icons + Portfolio Link */}
          <div className={styles.devCardFooter}>
            <div className={styles.socialRow}>
              {developer.developerGithubId && (
                <a
                  href={developer.developerGithubId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                  aria-label={`${developer.developerName} on GitHub`}
                  title="GitHub Profile"
                >
                  <FiGithub aria-hidden="true" />
                </a>
              )}
              {developer.developerTwitterId && (
                <a
                  href={developer.developerTwitterId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                  aria-label={`${developer.developerName} on Twitter`}
                  title="Twitter Profile"
                >
                  <FiTwitter aria-hidden="true" />
                </a>
              )}
              {developer.developerLinkedInId && (
                <a
                  href={developer.developerLinkedInId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                  aria-label={`${developer.developerName} on LinkedIn`}
                  title="LinkedIn Profile"
                >
                  <FiLinkedin aria-hidden="true" />
                </a>
              )}
            </div>

            {developer.developerPortfolio && (
              <a
                href={developer.developerPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.portfolioBtn}
                title="Visit Portfolio"
              >
                <FiGlobe size={14} aria-hidden="true" />
                <span>sunnysahsi.com</span>
                <FiExternalLink size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AboutDeveloper;
