import React from 'react';
import { FiBarChart2, FiFolder } from 'react-icons/fi';
import styles from './ProfileDetailsTab.module.css';

type ProfileDetailsTabProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  reposCount?: number;
};

const ProfileDetailsTab: React.FC<ProfileDetailsTabProps> = ({
  activeTab,
  setActiveTab,
  reposCount,
}) => {
  return (
    <div className={styles.sectionTab} role="tablist">
      <div className={styles.tabsContainer}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'github-stats'}
          className={`${styles.tabButton} ${activeTab === 'github-stats' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('github-stats')}
        >
          <FiBarChart2 size={16} />
          <span>GitHub Stats</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'repos'}
          className={`${styles.tabButton} ${activeTab === 'repos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('repos')}
        >
          <FiFolder size={16} />
          <span>Repositories</span>
          {typeof reposCount === 'number' && (
            <span className={styles.tabBadge}>{reposCount}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailsTab;
