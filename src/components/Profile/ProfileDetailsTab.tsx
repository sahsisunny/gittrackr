type ProfileDetailsTabProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileDetailsTab = ({
  activeTab,
  setActiveTab,
}: ProfileDetailsTabProps) => {
  return (
    <div className="section-tab">
      <button
        className={`tab-button ${activeTab === 'github-stats' && 'active-tab'}`}
        onClick={() => setActiveTab('github-stats')}
      >
        Github Stats
      </button>
      <button
        className={`tab-button ${activeTab === 'repos' && 'active-tab'}`}
        onClick={() => setActiveTab('repos')}
      >
        Repositories
      </button>
    </div>
  );
};

export default ProfileDetailsTab;
