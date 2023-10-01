import getRepoNameFromUrl from '@/utils/getRepoNameFromUrl';
import getRepoUrl from '@/utils/getRepoUrl';
import styles from './DashboardIssues.module.css';
import FormatDate from '@/utils/FormatDate';

type IssueProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filteredIssuesPrs: {
    id: number;
    title: string;
    html_url: string;
    state: string;
    created_at: string;
    repository_url: string;
  }[];
};

const DashboardIssues = ({
  filteredIssuesPrs,
  searchQuery,
  setSearchQuery,
}: IssueProps) => {
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
      <div className={styles.repoList}>
        {filteredIssuesPrs.map((issue) => (
          <div key={issue.id}>
            <div className="repo-item">
              <div className="repo-details">
                <div className="repo-item-left">
                  <span className="repo-item-name">{issue.title}</span>
                </div>
                <div className="repo-item-right">
                  <span
                    className="repo-item-privacy"
                    onClick={() => {
                      window.open(`${getRepoUrl(issue.html_url)}`, '_blank');
                    }}
                  >
                    {getRepoNameFromUrl(issue.repository_url)}
                  </span>
                  <span className="repo-item-updated">
                    {FormatDate(issue.created_at)}
                  </span>
                </div>
              </div>
              <button
                className="issue-view-btn"
                onClick={() => {
                  window.open(`${issue.html_url}`, '_blank');
                }}
              >
                {issue.state === 'open' ? 'Open' : 'Closed'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardIssues;
