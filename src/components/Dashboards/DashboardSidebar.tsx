import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGitPullRequest,
  FiGitMerge,
  FiActivity,
  FiUserCheck,
  FiFilter,
} from 'react-icons/fi';
import styles from './DashboardSidebar.module.css';

type DashboardSidebarProps = {
  ASSIGNED_ISSUES: number;
  CLOSED_ISSUES: number;
  OWN_ISSUES: number;
  ALL_ISSUES: number;
  OPEN_PRS: number;
  CLOSED_PRS: number;
  MERGED_PRS: number;
  ALL_PRS: number;
  activeTab?: 'issues' | 'pullrequests';
  activeFilter?: string;
  onSelectFilter?: (tab: 'issues' | 'pullrequests', filter: string) => void;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  ASSIGNED_ISSUES,
  CLOSED_ISSUES,
  OWN_ISSUES,
  ALL_ISSUES,
  OPEN_PRS,
  CLOSED_PRS,
  MERGED_PRS,
  ALL_PRS,
  activeTab = 'issues',
  activeFilter = 'all',
  onSelectFilter,
}) => {
  const handleItemClick = (tab: 'issues' | 'pullrequests', filter: string) => {
    if (onSelectFilter) {
      onSelectFilter(tab, filter);
    }
  };

  const isItemActive = (tab: 'issues' | 'pullrequests', filter: string) => {
    return activeTab === tab && activeFilter === filter;
  };

  return (
    <aside className={styles.sectionSidebar} aria-label="Activity Metrics Summary">
      <div className={styles.sidebarTitleBox}>
        <h3 className={styles.sidebarTitle}>
          <FiFilter size={16} color="var(--accent-cyan)" />
          <span>Velocity Summary</span>
        </h3>
        <FiActivity color="var(--accent-cyan)" />
      </div>

      {/* Issues Group */}
      <div className={styles.sidebarContainer}>
        <h4 className={styles.groupHeading}>Issues Breakdown</h4>
        <div className={styles.statsList} role="group" aria-label="Issues filter group">
          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('issues', 'assigned') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('issues', 'assigned')}
            title="Click to filter by Assigned Issues"
          >
            <span className={styles.statName}>
              <FiUserCheck color="#38bdf8" />
              <span>Assigned Issues</span>
            </span>
            <span className={styles.statValue}>{ASSIGNED_ISSUES}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('issues', 'created') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('issues', 'created')}
            title="Click to filter by Created by Me"
          >
            <span className={styles.statName}>
              <FiAlertCircle color="#fbbf24" />
              <span>Created by Me</span>
            </span>
            <span className={styles.statValue}>{OWN_ISSUES}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('issues', 'closed') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('issues', 'closed')}
            title="Click to filter by Closed Issues"
          >
            <span className={styles.statName}>
              <FiCheckCircle color="#10b981" />
              <span>Closed Issues</span>
            </span>
            <span className={styles.statValue}>{CLOSED_ISSUES}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('issues', 'all') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('issues', 'all')}
            title="Click to show All Indexed Issues"
          >
            <span className={styles.statName}>
              <FiActivity color="#94a3b8" />
              <span>Total Indexed</span>
            </span>
            <span className={styles.statValue}>{ALL_ISSUES}</span>
          </button>
        </div>
      </div>

      {/* Pull Requests Group */}
      <div className={styles.sidebarContainer}>
        <h4 className={styles.groupHeading}>Pull Requests Breakdown</h4>
        <div className={styles.statsList} role="group" aria-label="Pull Requests filter group">
          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('pullrequests', 'open') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('pullrequests', 'open')}
            title="Click to filter by Open PRs"
          >
            <span className={styles.statName}>
              <FiGitPullRequest color="#38bdf8" />
              <span>Open PRs</span>
            </span>
            <span className={styles.statValue}>{OPEN_PRS}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('pullrequests', 'merged') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('pullrequests', 'merged')}
            title="Click to filter by Merged PRs"
          >
            <span className={styles.statName}>
              <FiGitMerge color="#c084fc" />
              <span>Merged PRs</span>
            </span>
            <span className={styles.statValue}>{MERGED_PRS}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('pullrequests', 'closed') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('pullrequests', 'closed')}
            title="Click to filter by Closed PRs"
          >
            <span className={styles.statName}>
              <FiCheckCircle color="#94a3b8" />
              <span>Closed PRs</span>
            </span>
            <span className={styles.statValue}>{CLOSED_PRS}</span>
          </button>

          <button
            type="button"
            className={`${styles.statItem} ${isItemActive('pullrequests', 'all') ? styles.statItemActive : ''}`}
            onClick={() => handleItemClick('pullrequests', 'all')}
            title="Click to show All Indexed PRs"
          >
            <span className={styles.statName}>
              <FiActivity color="#818cf8" />
              <span>Total Indexed</span>
            </span>
            <span className={styles.statValue}>{ALL_PRS}</span>
          </button>
        </div>
      </div>

      <div className={styles.filterHint}>
        <span>💡 Click any metric to filter the live list</span>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
