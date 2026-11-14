import { fetchGitHubWithCache, getRateLimitInfo } from './githubCache';

export type GitHubSearchResult = {
  total_count: number;
  items: any[];
  hasMore: boolean;
  page: number;
  isRateLimited?: boolean;
};

/**
 * Fetch a single page of GitHub Search results with in-memory caching and rate-limit guard.
 * This prevents the explosive multi-request bursts that trigger GitHub 403 / 429 rate limits.
 */
export const fetchGitHubSearchPage = async (
  queryUrl: string,
  token: string,
  page: number = 1,
  perPage: number = 25
): Promise<GitHubSearchResult> => {
  try {
    const separator = queryUrl.includes('?') ? '&' : '?';
    const pageUrl = `${queryUrl}${separator}per_page=${perPage}&page=${page}`;

    const { data, status } = await fetchGitHubWithCache<any>(pageUrl, token, 120_000);

    if (status === 422 || status === 404) {
      return { total_count: 0, items: [], hasMore: false, page };
    }

    if (status === 403 || status === 429) {
      return { total_count: 0, items: [], hasMore: false, page, isRateLimited: true };
    }

    if (!data) {
      return { total_count: 0, items: [], hasMore: false, page };
    }

    const totalCount =
      typeof data.total_count === 'number'
        ? data.total_count
        : data.items?.length || 0;
    const items = Array.isArray(data.items) ? [...data.items] : [];
    const hasMore = items.length === perPage && page * perPage < totalCount;

    return { total_count: totalCount, items, hasMore, page };
  } catch (error) {
    console.error('[GitTrackr] Error fetching GitHub search page:', error);
    return { total_count: 0, items: [], hasMore: false, page };
  }
};

/**
 * Safe paginated fetch: fetches the initial page without firing explosive concurrent requests.
 * Compatible with existing dashboard callers.
 */
export const fetchPaginatedGitHubData = async (
  queryUrl: string,
  token: string,
  onInitialPage: (firstPageData: { total_count: number; items: any[] }) => void,
  onAllPages: (allItems: any[], totalCount: number) => void
): Promise<void> => {
  try {
    const firstPage = await fetchGitHubSearchPage(queryUrl, token, 1, 30);

    onInitialPage({ total_count: firstPage.total_count, items: firstPage.items });
    onAllPages(firstPage.items, firstPage.total_count);
  } catch (error) {
    console.error('[GitTrackr] Error in fetchPaginatedGitHubData:', error);
    onInitialPage({ total_count: 0, items: [] });
    onAllPages([], 0);
  }
};

const FetchIssuePr = async <T = unknown,>(
  url: string,
  token: string,
  setDataCallback: (data: T) => void
): Promise<void> => {
  try {
    const { data } = await fetchGitHubWithCache<T>(url, token, 180_000);
    if (data !== null) {
      setDataCallback(data);
    }
  } catch (error) {
    console.error('[GitTrackr] Error in FetchIssuePr:', error);
  }
};

export default FetchIssuePr;
