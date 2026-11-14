import React from 'react';
import Image from 'next/image';
import { FiAlertCircle, FiGitPullRequest, FiGithub } from 'react-icons/fi';
import styles from './DashboardHeader.module.css';

type DashBoardHeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  AVATAR_URL?: string;
  NAME: string;
  issuesCount?: number;
  prsCount?: number;
};

const DashBoardHeader: React.FC<DashBoardHeaderProps> = ({
  activeTab,
  setActiveTab,
  AVATAR_URL,
  NAME,
  issuesCount = 0,
  prsCount = 0,
}) => {
  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.dashboardProfile}>
        {AVATAR_URL ? (
          <Image
            className={styles.dashboardProfileImg}
            src={AVATAR_URL}
            alt={NAME || 'User'}
            width={48}
            height={48}
          />
        ) : (
          <div
            className={styles.dashboardProfileImg}
            style={{
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-surface-elevated)',
            }}
          >
            <FiGithub size={24} color="#38bdf8" />
          </div>
        )}
        <div className={styles.dashboardProfileInfo}>
          <h2 className={styles.dashboardProfileName}>{NAME}</h2>
          <span className={styles.dashboardProfileBadge}>
            <FiGithub aria-hidden="true" />
            <span>Developer Cockpit</span>
          </span>
        </div>
      </div>

      <div className={styles.dashBoardTab} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'issues'}
          className={`${styles.tabButton} ${activeTab === 'issues' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          <FiAlertCircle aria-hidden="true" />
          <span>Issues</span>
          <span className={styles.tabBadge}>{issuesCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pullrequests'}
          className={`${styles.tabButton} ${activeTab === 'pullrequests' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('pullrequests')}
        >
          <FiGitPullRequest aria-hidden="true" />
          <span>Pull Requests</span>
          <span className={styles.tabBadge}>{prsCount}</span>
        </button>
      </div>
    </header>
  );
};

export default DashBoardHeader;
