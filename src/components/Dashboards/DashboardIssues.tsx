import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiX,
  FiGitPullRequest,
  FiAlertCircle,
  FiCheckCircle,
  FiGitMerge,
  FiExternalLink,
  FiClock,
  FiLayers,
  FiRotateCcw,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi';
import getRepoNameFromUrl from '@/utils/getRepoNameFromUrl';
import getRepoUrl from '@/utils/getRepoUrl';
import FormatDate from '@/utils/FormatDate';
import { ListSkeleton } from '@/components/Loader';
import styles from './DashboardIssues.module.css';

export type IssueItem = {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  repository_url: string;
  user?: { login: string };
  assignee?: { login: string };
  assignees?: { login: string }[];
  pull_request?: {
    merged_at: string | null;
  };
  comments_count?: number;
  labels?: { name: string; color: string }[];
};

type IssueProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  filteredIssuesPrs: IssueItem[];
  totalCount: number;
  activeTabType?: 'issues' | 'pullrequests';
  onResetFilters: () => void;
  isLoading?: boolean;
};

const DashboardIssues: React.FC<IssueProps> = ({
  filteredIssuesPrs,
  totalCount,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  activeTabType = 'issues',
  onResetFilters,
  isLoading = false,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(20);

  // Reset pagination window when filters or tabs change
  useEffect(() => {
    setVisibleCount(20);
  }, [statusFilter, searchQuery, activeTabType]);

  const displayedItems = filteredIssuesPrs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredIssuesPrs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const isFiltered = statusFilter !== 'all' || searchQuery.trim() !== '';

  const getStatusFilterLabel = (filter: string) => {
    switch (filter) {
      case 'assigned':
        return 'Assigned Issues';
      case 'created':
        return 'Created by Me';
      case 'open':
        return activeTabType === 'pullrequests' ? 'Open PRs' : 'Open Issues';
      case 'merged':
        return 'Merged PRs';
      case 'closed':
        return activeTabType === 'pullrequests' ? 'Closed PRs' : 'Closed Issues';
      default:
        return 'All';
    }
  };

  const getItemStatusBadge = (item: IssueItem) => {
    if (activeTabType === 'pullrequests') {
      if (item.pull_request?.merged_at) {
        return (
          <span className="status-badge merged">
            <FiGitMerge aria-hidden="true" /> Merged
          </span>
        );
      }
      if (item.state === 'open') {
        return (
          <span className="status-badge open">
            <FiGitPullRequest aria-hidden="true" /> Open
          </span>
        );
      }
      return (
        <span className="status-badge closed">
          <FiCheckCircle aria-hidden="true" /> Closed
        </span>
      );
    }

    if (item.state === 'open') {
      return (
        <span className="status-badge open">
          <FiAlertCircle aria-hidden="true" /> Open
        </span>
      );
    }
    return (
      <span className="status-badge closed">
        <FiCheckCircle aria-hidden="true" /> Closed
      </span>
    );
  };

  return (
    <div className={styles.issuesContainer}>
      {/* Search and Filters Bar */}
      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder={`Search ${activeTabType === 'issues' ? 'issues' : 'pull requests'} by title or repo...`}
            className={styles.searchInput}
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
              <FiX size={16} />
            </button>
          )}
        </div>

        <div className={styles.filterControlsRight}>
          {/* Status Filter Tabs */}
          <div className={styles.statusFilterTabs} role="group" aria-label="Status filter">
            <button
              type="button"
              className={`${styles.filterTabBtn} ${statusFilter === 'all' ? styles.activeFilter : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.filterTabBtn} ${statusFilter === 'open' ? styles.activeFilter : ''}`}
              onClick={() => setStatusFilter('open')}
            >
              Open
            </button>
            {activeTabType === 'pullrequests' && (
              <button
                type="button"
                className={`${styles.filterTabBtn} ${statusFilter === 'merged' ? styles.activeFilter : ''}`}
                onClick={() => setStatusFilter('merged')}
              >
                Merged
              </button>
            )}
            <button
              type="button"
              className={`${styles.filterTabBtn} ${statusFilter === 'closed' ? styles.activeFilter : ''}`}
              onClick={() => setStatusFilter('closed')}
            >
              Closed
            </button>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              type="button"
              className={styles.resetFilterBtn}
              onClick={onResetFilters}
              title="Reset all active search queries and filters"
            >
              <FiRotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Status Bar */}
      {isFiltered && (
        <div className={styles.filterStatusBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <FiFilter size={14} color="var(--accent-cyan)" />
            <span>Active Filter:</span>
            {statusFilter !== 'all' && (
              <span className={styles.filterBadgePill}>
                {getStatusFilterLabel(statusFilter)}
                <button
                  type="button"
                  className={styles.removeFilterTagBtn}
                  onClick={() => setStatusFilter('all')}
                  aria-label="Remove status filter"
                >
                  <FiX size={12} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className={styles.filterBadgePill}>
                Query: &quot;{searchQuery}&quot;
                <button
                  type="button"
                  className={styles.removeFilterTagBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search query"
                >
                  <FiX size={12} />
                </button>
              </span>
            )}
          </div>
          <div>
            Showing <strong>{displayedItems.length}</strong> of <strong>{filteredIssuesPrs.length}</strong> items
          </div>
        </div>
      )}

      {/* Independently Scrollable List of Issues or PRs */}
      <div className={styles.itemsList}>
        {isLoading ? (
          <ListSkeleton count={6} />
        ) : filteredIssuesPrs.length > 0 ? (
          <>
            {displayedItems.map((item) => (
              <div key={item.id} className="repo-item">
                <div className="repo-details">
                  <div className="repo-item-left">
                    {getItemStatusBadge(item)}
                    <span className="repo-item-name">{item.title}</span>
                  </div>

                  <div className="repo-item-right">
                    <span
                      className="repo-item-privacy"
                      onClick={() => {
                        window.open(getRepoUrl(item.html_url), '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <FiLayers aria-hidden="true" />
                      <span>{getRepoNameFromUrl(item.repository_url)}</span>
                    </span>

                    <span
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      suppressHydrationWarning
                    >
                      <FiClock aria-hidden="true" />
                      <span suppressHydrationWarning>{FormatDate(item.created_at)}</span>
                    </span>

                    {item.labels && item.labels.length > 0 && (
                      <div style={{ display: 'inline-flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {item.labels.map((label) => (
                          <span
                            key={label.name}
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '4px',
                              backgroundColor: `#${label.color}22`,
                              color: `#${label.color}`,
                              border: `1px solid #${label.color}44`,
                              fontWeight: 600,
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="issue-view-btn"
                  aria-label={`View on GitHub: ${item.title}`}
                >
                  <span>View</span>
                  <FiExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            ))}

            {hasMore && (
              <div className={styles.paginationContainer}>
                <button
                  type="button"
                  className={styles.loadMoreBtn}
                  onClick={handleLoadMore}
                >
                  <FiChevronDown size={16} />
                  <span>
                    Load More {activeTabType === 'pullrequests' ? 'PRs' : 'Issues'} ({filteredIssuesPrs.length - visibleCount} remaining)
                  </span>
                </button>
                <span className={styles.paginationStatus}>
                  Showing {displayedItems.length} of {filteredIssuesPrs.length} loaded items
                </span>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconBox}>
              <FiSearch />
            </div>
            <h3 className={styles.emptyTitle}>No matching items found</h3>
            <p className={styles.emptyDesc}>
              {searchQuery || statusFilter !== 'all'
                ? `No ${activeTabType === 'issues' ? 'issues' : 'pull requests'} match your filter criteria.`
                : `No ${activeTabType === 'issues' ? 'issues' : 'pull requests'} indexed for this account.`}
            </p>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={onResetFilters}
              >
                <FiRotateCcw size={15} />
                <span>Reset Search &amp; Filters</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardIssues;
