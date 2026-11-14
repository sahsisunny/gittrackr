import { fetchGitHubWithCache } from './githubCache';

export default async function getMostUsedLanguages(username, session) {
  try {
    const token = session?.accessToken;
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    const { data: repositories } = await fetchGitHubWithCache(url, token, 300_000);

    if (!Array.isArray(repositories)) {
      return [];
    }

    const languages = repositories.reduce((acc, repo) => {
      const language = repo.language;
      if (language) {
        acc[language] = (acc[language] || 0) + 1;
      }
      return acc;
    }, {});

    const mostUsedLanguages = Object.keys(languages).sort(
      (a, b) => languages[b] - languages[a]
    );

    return mostUsedLanguages;
  } catch (error) {
    console.error('[GitTrackr] Error calculating most used languages:', error);
    return [];
  }
}
