import { fetchGitHubWithCache } from './githubCache';

const fetchData = async <T = unknown,>(
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
    console.error('[GitTrackr] Error fetching data:', error);
  }
};

export default fetchData;
