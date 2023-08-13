async function fetchUserRepositories(username, session) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `token ${session.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error fetching user repositories');
  }

  const repositories = await response.json();
  return repositories;
}

export default async function getMostUsedLanguages(username, session) {
  try {
    const repositories = await fetchUserRepositories(username, session);

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
    console.error('Error fetching user repositories:', error);
    return [];
  }
}
