import styles from './ProfileGitHubRepository.module.css';
import FormatDate from '@/utils/FormatDate';

type ProfileGitHubRepositoryProps = {
  languageColors: { [key: string]: string };
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filteredRepos: {
    id: number;
    name: string;
    html_url: string;
    language: string;
    private: boolean;
    updated_at: string;
  }[];
};

function isColorLight(hexColor: string) {
  const r = parseInt(hexColor?.slice(1, 3), 16);
  const g = parseInt(hexColor?.slice(3, 5), 16);
  const b = parseInt(hexColor?.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

const ProfileGitHubRepository = ({
  languageColors,
  searchQuery,
  setSearchQuery,
  filteredRepos,
}: ProfileGitHubRepositoryProps) => {
  return (
    <div className="section-tab-content">
      <div className={styles.repoFiltersContainer}>
        <input
          type="text"
          placeholder="Search repositories..."
          className={styles.repoSearchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={styles.repoSearchButton}
          onClick={() => {
            setSearchQuery('');
          }}
        >
          Search
        </button>
      </div>
      <div className={styles.repoListContainer}>
        {filteredRepos?.map((repo, index) => (
          <div key={repo.id} className={styles.repoItems}>
            <div>
              <div>
                <span>
                  {index + 1 + '. '}
                  {repo.name}
                </span>
              </div>
              <div className="repo-item-right">
                {repo.language && (
                  <span
                    className={styles.repoItemLanguage}
                    style={{
                      backgroundColor: languageColors[repo.language],
                      color: isColorLight(languageColors[repo.language])
                        ? '#000'
                        : '#fff',
                    }}
                  >
                    {repo.language}
                  </span>
                )}
                <span className="repo-item-privacy">
                  {repo.private ? 'Private' : 'Public'}
                </span>
                <span className="repo-item-updated">
                  {FormatDate(repo.updated_at)}
                </span>
              </div>
            </div>
            <button
              className={styles.repoViewButton}
              onClick={() => {
                window.open(`${repo.html_url}`, '_blank', 'noopener');
              }}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGitHubRepository;
