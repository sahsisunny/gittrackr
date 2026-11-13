import React from 'react';
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiUser,
  FiCode,
  FiShare2,
} from 'react-icons/fi';
import styles from './ProfileSidebar.module.css';

type ProfileSidebarProps = {
  USERNAME: string;
  WEBSITE?: string;
  NAME?: string;
  BIO?: string;
  mostUsedLanguages: string[];
  languageColors: { [key: string]: string };
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  USERNAME,
  WEBSITE,
  NAME,
  BIO,
  mostUsedLanguages = [],
  languageColors = {},
}) => {
  return (
    <aside className={styles.sidebarWrapper} aria-label="Developer Information">
      {/* Social Links Card */}
      <div className={styles.sidebarCard}>
        <h3 className={styles.cardTitle}>
          <FiShare2 size={14} color="var(--accent-cyan)" />
          <span>Social &amp; Profiles</span>
        </h3>
        <div className={styles.socialRow}>
          {USERNAME && (
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label={`${USERNAME} on GitHub`}
              title="GitHub Profile"
            >
              <FiGithub />
            </a>
          )}
          {USERNAME && (
            <a
              href={`https://twitter.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label={`${USERNAME} on Twitter`}
              title="Twitter / X Profile"
            >
              <FiTwitter />
            </a>
          )}
          {USERNAME && (
            <a
              href={`https://www.linkedin.com/in/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label={`${USERNAME} on LinkedIn`}
              title="LinkedIn Profile"
            >
              <FiLinkedin />
            </a>
          )}
          {WEBSITE && (
            <a
              href={WEBSITE.startsWith('http') ? WEBSITE : `https://${WEBSITE}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Personal Website"
              title="Personal Website"
            >
              <FiGlobe />
            </a>
          )}
        </div>
      </div>

      {/* Bio Card */}
      {BIO && (
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>
            <FiUser size={14} color="var(--accent-cyan)" />
            <span>{NAME ? `${NAME.split(' ')[0]}'s Bio` : 'Bio'}</span>
          </h3>
          <p className={styles.userBio}>{BIO}</p>
        </div>
      )}

      {/* Most Used Languages */}
      {mostUsedLanguages && mostUsedLanguages.length > 0 && (
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>
            <FiCode size={14} color="var(--accent-cyan)" />
            <span>Most Used Languages</span>
          </h3>
          <div className={styles.languagesGrid}>
            {mostUsedLanguages.map((language) => {
              const dotColor = languageColors[language] || '#38bdf8';
              return (
                <span className={styles.languagePill} key={language}>
                  <span
                    className={styles.languageDot}
                    style={{ backgroundColor: dotColor }}
                  />
                  <span>{language}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProfileSidebar;
