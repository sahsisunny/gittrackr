import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiBriefcase, FiActivity, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import ProfileImage from '../../assets/dummyProfileImage.png';
import styles from './ProfileHeader.module.css';

type ProfileHeaderProps = {
  NAME?: string | null;
  USERNAME?: string;
  COMPANY?: string | null;
  AVATAR_URL?: string | null;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  NAME,
  USERNAME,
  COMPANY,
  AVATAR_URL,
}) => {
  const displayName = NAME || USERNAME || 'Developer';

  return (
    <div className={styles.headerCard}>
      <div className={styles.headerGlow} aria-hidden="true" />

      <div className={styles.userProfileGroup}>
        <div className={styles.avatarWrapper}>
          <Image
            src={AVATAR_URL || ProfileImage}
            alt={displayName}
            className={styles.avatarPhoto}
            width={104}
            height={104}
            priority
          />
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userNameRow}>
            <h2 className={styles.userName}>{displayName}</h2>
            <span className={styles.userBadge}>
              <FiCheckCircle size={12} />
              <span>Verified Developer</span>
            </span>
          </div>

          <div className={styles.metaRow}>
            {USERNAME && (
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.userLoginLink}
                title="View GitHub profile"
              >
                <FiGithub size={15} />
                <span>@{USERNAME}</span>
              </a>
            )}

            {COMPANY && (
              <span className={styles.companyPill}>
                <FiBriefcase size={14} />
                <span>Worked at {COMPANY}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
        {USERNAME && (
          <Link
            href={`/dashboard/${USERNAME}`}
            className={styles.actionBtnPrimary}
            title="Open PR & Issue Cockpit"
          >
            <FiActivity size={15} />
            <span>Open Dashboard</span>
          </Link>
        )}

        {USERNAME && (
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtnSecondary}
            title="View external profile on GitHub"
          >
            <span>GitHub</span>
            <FiExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
