/**
 * In-memory client-side cache and rate-limit guard for GitHub API calls.
 * Prevents redundant fetches and shields users from GitHub's 30 req/min search
 * and 5,000 req/hr core rate limits.
 */

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

// Global in-memory cache map
const apiCache = new Map<string, CacheEntry<any>>();

// In-flight promises map to deduplicate identical concurrent requests
const pendingRequests = new Map<string, Promise<any>>();

// Rate limit telemetry
let rateLimitInfo = {
  limit: 5000,
  remaining: 5000,
  resetTime: 0,
  isRateLimited: false,
};

export const getRateLimitInfo = () => ({ ...rateLimitInfo });

export const updateRateLimitFromHeaders = (headers: Headers) => {
  const limitHeader = headers.get('x-ratelimit-limit');
  const remainingHeader = headers.get('x-ratelimit-remaining');
  const resetHeader = headers.get('x-ratelimit-reset');

  if (limitHeader) rateLimitInfo.limit = parseInt(limitHeader, 10);
  if (remainingHeader) {
    rateLimitInfo.remaining = parseInt(remainingHeader, 10);
    rateLimitInfo.isRateLimited = rateLimitInfo.remaining <= 0;
  }
  if (resetHeader) rateLimitInfo.resetTime = parseInt(resetHeader, 10) * 1000;
};

/**
 * Fetch GitHub API with caching, request collapsing, and rate-limit monitoring.
 * @param url Full GitHub API endpoint
 * @param token Optional OAuth token
 * @param ttlMs Time to live in ms (default: 3 minutes)
 */
export async function fetchGitHubWithCache<T = any>(
  url: string,
  token?: string,
  ttlMs: number = 180_000
): Promise<{ data: T | null; status: number; fromCache: boolean }> {
  const now = Date.now();

  // 1. Check TTL cache
  const cached = apiCache.get(url);
  if (cached && now - cached.timestamp < ttlMs) {
    return { data: cached.data as T, status: 200, fromCache: true };
  }

  // 2. Collapse identical concurrent requests
  if (pendingRequests.has(url)) {
    try {
      const data = await pendingRequests.get(url);
      return { data, status: 200, fromCache: true };
    } catch {
      // Fall through to retry on error
    }
  }

  // 3. Execute fresh fetch
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch(url, { headers });
      updateRateLimitFromHeaders(response.headers);

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          rateLimitInfo.isRateLimited = true;
          console.warn(
            `[GitTrackr] GitHub rate limit reached (status ${response.status}). Reset at: ${new Date(rateLimitInfo.resetTime).toLocaleTimeString()}`
          );
        }
        return { data: null, status: response.status, fromCache: false };
      }

      const data = await response.json();
      // Store in cache
      apiCache.set(url, { data, timestamp: now });
      return { data, status: response.status, fromCache: false };
    } catch (error) {
      console.error(`[GitTrackr] Network error fetching ${url}:`, error);
      return { data: null, status: 0, fromCache: false };
    } finally {
      pendingRequests.delete(url);
    }
  })();

  pendingRequests.set(url, fetchPromise);
  return fetchPromise;
}

/**
 * Clear the in-memory cache manually if required (e.g. on logout or manual refresh).
 */
export const clearGitHubCache = () => {
  apiCache.clear();
  pendingRequests.clear();
};
