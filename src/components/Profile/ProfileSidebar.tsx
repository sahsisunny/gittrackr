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
  USERNAME?: string;
  WEBSITE?: string | null;
  TWITTER_USERNAME?: string | null;
  NAME?: string | null;
  BIO?: string | null;
  mostUsedLanguages: string[];
  languageColors: { [key: string]: string };
  isOrg?: boolean;
};

interface SocialLinkItem {
  key: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  USERNAME,
  WEBSITE,
  TWITTER_USERNAME,
  NAME,
  BIO,
  mostUsedLanguages = [],
  languageColors = {},
  isOrg = false,
}) => {
  // Only display verified links from GitHub data — do not fabricate unverified links
  const socialLinks: SocialLinkItem[] = [];

  if (USERNAME) {
    socialLinks.push({
      key: 'github',
      href: `https://github.com/${USERNAME}`,
      icon: <FiGithub />,
      label: `${USERNAME} on GitHub`,
      title: isOrg ? 'GitHub Organization' : 'GitHub Profile',
    });
  }

  const cleanTwitter = TWITTER_USERNAME?.trim().replace(/^@/, '');
  if (cleanTwitter) {
    socialLinks.push({
      key: 'twitter',
      href: `https://twitter.com/${cleanTwitter}`,
      icon: <FiTwitter />,
      label: `@${cleanTwitter} on Twitter`,
      title: 'Twitter / X Profile',
    });
  }

  if (WEBSITE?.trim()) {
    const rawUrl = WEBSITE.trim();
    const formattedUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
      ? rawUrl
      : `https://${rawUrl}`;

    const isLinkedIn = rawUrl.toLowerCase().includes('linkedin.com');
    const isTwitterLink = rawUrl.toLowerCase().includes('twitter.com') || rawUrl.toLowerCase().includes('x.com');

    if (isLinkedIn) {
      socialLinks.push({
        key: 'linkedin',
        href: formattedUrl,
        icon: <FiLinkedin />,
        label: 'LinkedIn Profile',
        title: 'LinkedIn Profile',
      });
    } else if (isTwitterLink && !cleanTwitter) {
      socialLinks.push({
        key: 'twitter',
        href: formattedUrl,
        icon: <FiTwitter />,
        label: 'Twitter / X Profile',
        title: 'Twitter / X Profile',
      });
    } else if (!isTwitterLink) {
      socialLinks.push({
        key: 'website',
        href: formattedUrl,
        icon: <FiGlobe />,
        label: isOrg ? 'Organization Website' : 'Website',
        title: isOrg ? 'Organization Website' : 'Website',
      });
    }
  }

  return (
    <aside className={styles.sidebarWrapper} aria-label={isOrg ? 'Organization Information' : 'Developer Information'}>
      {/* Social Links Card - only displayed when valid links exist */}
      {socialLinks.length > 0 && (
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>
            <FiShare2 size={14} color="var(--accent-cyan)" />
            <span>Social &amp; Profiles</span>
          </h3>
          <div className={styles.socialRow}>
            {socialLinks.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={item.label}
                title={item.title}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bio / About Card */}
      {BIO && (
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>
            <FiUser size={14} color="var(--accent-cyan)" />
            <span>{isOrg ? 'About Organization' : (NAME ? `${NAME.split(' ')[0]}'s Bio` : 'Bio')}</span>
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
