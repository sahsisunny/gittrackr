import FilterComponent from '../Filter';
import styles from './DashboardHeader.module.css';
import Image from 'next/image';

type DashBoardHeaderProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  AVATAR_URL: string;
  NAME: string;
};

const DashBoardHeader = ({
  activeTab,
  setActiveTab,
  AVATAR_URL,
  NAME,
}: DashBoardHeaderProps) => {
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.dashboardProfile}>
        <Image
          className={styles.dashboardProfileImg}
          src={AVATAR_URL}
          alt={NAME || 'User'}
          width="50"
          height="50"
        />
        <p className={styles.dashboardProfileName}>{NAME}</p>
      </div>
      <div className={styles.dashBoardTab}>
        <FilterComponent />
        <button
          className={
            styles.tabButton +
            ' ' +
            (activeTab === 'issues' && styles.activeTab)
          }
          onClick={() => setActiveTab('issues')}
        >
          Issues
        </button>
        <button
          className={
            styles.tabButton +
            ' ' +
            (activeTab === 'pullrequests' && styles.activeTab)
          }
          onClick={() => setActiveTab('pullrequests')}
        >
          Pull Requests
        </button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
