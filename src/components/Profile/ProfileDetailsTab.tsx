import styles from './ProfileDetailsTab.module.css';
type ProfileDetailsTabProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileDetailsTab = ({
  activeTab,
  setActiveTab,
}: ProfileDetailsTabProps) => {
  return (
    <div className={styles.sectionTab}>
      <button
        className={
          styles.tabButton +
          ' ' +
          (activeTab === 'github-stats' && styles.activeTab)
        }
        onClick={() => setActiveTab('github-stats')}
      >
        Github Stats
      </button>
      <button
        className={
          styles.tabButton + ' ' + (activeTab === 'repos' && styles.activeTab)
        }
        onClick={() => setActiveTab('repos')}
      >
        Repositories
      </button>
    </div>
  );
};

export default ProfileDetailsTab;
