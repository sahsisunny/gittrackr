import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiExternalLink, FiClock, FiFolder, FiChevronDown } from 'react-icons/fi';
import { RepoSkeleton } from '@/components/Loader';
import styles from './ProfileGitHubRepository.module.css';
import FormatDate from '@/utils/FormatDate';

export type RepoItem = {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  private: boolean;
  updated_at: string;
};

type ProfileGitHubRepositoryProps = {
  languageColors: { [key: string]: string };
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filteredRepos: RepoItem[];
  isLoading?: boolean;
};

const ProfileGitHubRepository: React.FC<ProfileGitHubRepositoryProps> = ({
  languageColors = {},
  searchQuery,
  setSearchQuery,
  filteredRepos = [],
  isLoading = false,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(15);

  useEffect(() => {
    setVisibleCount(15);
  }, [searchQuery]);

  const displayedRepos = filteredRepos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRepos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  return (
    <div className={styles.repoWrapper}>
      {/* Search Header */}
      <div className={styles.repoFiltersContainer}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search repositories by name..."
            className={styles.repoSearchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <FiX size={15} />
            </button>
          )}
        </div>

        <span className={styles.repoCountBadge}>
          Showing <strong>{displayedRepos.length}</strong> of <strong>{filteredRepos.length}</strong> repositories
        </span>
      </div>

      {/* Independently Scrollable Repositories List */}
      <div className={styles.repoListContainer}>
        {isLoading ? (
          <RepoSkeleton count={5} />
        ) : filteredRepos.length > 0 ? (
          <>
            {displayedRepos.map((repo, index) => {
              const langColor = (repo.language && languageColors[repo.language]) || '#38bdf8';

              return (
                <div key={repo.id} className={styles.repoCard}>
                  <div className={styles.repoDetails}>
                    <div className={styles.repoHeaderRow}>
                      <span className={styles.repoIndex}>#{index + 1}</span>
                      <FiFolder color="var(--accent-cyan)" size={16} />
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoName}
                      >
                        {repo.name}
                      </a>
                    </div>

                    <div className={styles.repoMetaRow}>
                      {repo.language && (
                        <span className={styles.languagePill}>
                          <span
                            className={styles.languageDot}
                            style={{ backgroundColor: langColor }}
                          />
                          <span>{repo.language}</span>
                        </span>
                      )}

                      <span
                        className={`${styles.privacyBadge} ${
                          repo.private ? styles.privateBadge : styles.publicBadge
                        }`}
                      >
                        {repo.private ? 'Private' : 'Public'}
                      </span>

                      <span className={styles.updatedTime}>
                        <FiClock size={12} />
                        <span suppressHydrationWarning>Updated {FormatDate(repo.updated_at)}</span>
                      </span>
                    </div>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoViewButton}
                    title={`View ${repo.name} on GitHub`}
                  >
                    <span>Open</span>
                    <FiExternalLink size={13} />
                  </a>
                </div>
              );
            })}

            {hasMore && (
              <div className={styles.paginationContainer}>
                <button
                  type="button"
                  className={styles.loadMoreBtn}
                  onClick={handleLoadMore}
                >
                  <FiChevronDown size={16} />
                  <span>
                    Load More Repositories ({filteredRepos.length - visibleCount} remaining)
                  </span>
                </button>
                <span className={styles.paginationStatus}>
                  Showing {displayedRepos.length} of {filteredRepos.length} repositories
                </span>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <FiSearch size={32} color="var(--accent-cyan)" />
            <h4 className={styles.emptyTitle}>No repositories found</h4>
            <p className={styles.emptyDesc}>
              {searchQuery
                ? `No repositories matched "${searchQuery}".`
                : 'No public repositories indexed for this profile.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileGitHubRepository;
