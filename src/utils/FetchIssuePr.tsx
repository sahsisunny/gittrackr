export const fetchPaginatedGitHubData = async (
  queryUrl: string,
  token: string,
  onInitialPage: (firstPageData: { total_count: number; items: any[] }) => void,
  onAllPages: (allItems: any[], totalCount: number) => void
): Promise<void> => {
  try {
    const separator = queryUrl.includes('?') ? '&' : '?';
    const page1Url = `${queryUrl}${separator}per_page=100&page=1`;

    const res1 = await fetch(page1Url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res1.ok) {
      console.error(`GitHub API error ${res1.status}: ${res1.statusText}`);
      return;
    }

    const data1 = await res1.json();
    const totalCount =
      typeof data1.total_count === 'number'
        ? data1.total_count
        : data1.items?.length || 0;
    const items = Array.isArray(data1.items) ? [...data1.items] : [];

    // Immediately notify with first page items and actual total count
    onInitialPage({ total_count: totalCount, items });

    // If more than 100 items exist, concurrently fetch remaining pages up to 1,000 items
    const totalPages = Math.min(10, Math.ceil(totalCount / 100));
    if (totalPages > 1) {
      const pagePromises = [];
      for (let p = 2; p <= totalPages; p++) {
        const nextUrl = `${queryUrl}${separator}per_page=100&page=${p}`;
        pagePromises.push(
          fetch(nextUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }).then((r) => (r.ok ? r.json() : null))
        );
      }

      const results = await Promise.all(pagePromises);
      results.forEach((pg) => {
        if (pg && Array.isArray(pg.items)) {
          items.push(...pg.items);
        }
      });

      onAllPages(items, totalCount);
    } else {
      onAllPages(items, totalCount);
    }
  } catch (error) {
    console.error('Error fetching paginated GitHub data:', error);
  }
};

const FetchIssuePr = async <T = unknown,>(
  url: string,
  token: string,
  setDataCallback: (data: T) => void
): Promise<void> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    const data = await response.json();
    setDataCallback(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default FetchIssuePr;
