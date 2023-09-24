const fetchGitHubItemCount = async (
  type: string,
  username: string,
  token: string
): Promise<number> => {
  const baseUrl = 'https://api.github.com'; // GitHub API base URL
  let endpoint = '';

  switch (type) {
    case 'assigned_issues':
      endpoint = `${baseUrl}/repos/${username}/issues?assignee=${username}&state=all`;
      break;
    case 'closed_issues':
      endpoint = `${baseUrl}/repos/${username}/issues?state=closed`;
      break;
    case 'own_issues':
      endpoint = `${baseUrl}/repos/${username}/issues?creator=${username}&state=all`;
      break;
    case 'all_issues':
      endpoint = `${baseUrl}/repos/${username}/issues?state=all`;
      break;
    case 'open_prs':
      endpoint = `${baseUrl}/repos/${username}/pulls?state=open`;
      break;
    case 'closed_prs':
      endpoint = `${baseUrl}/repos/${username}/pulls?state=closed`;
      break;
    case 'merged_prs':
      endpoint = `${baseUrl}/repos/${username}/pulls?state=closed`;
      break;
    case 'all_prs':
      endpoint = `${baseUrl}/repos/${username}/pulls?state=all`;
      break;
    default:
      throw new Error('Invalid item type');
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.length;
    } else {
      throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
    }
  } catch (error: any) {
    throw new Error(`Error fetching ${type}: ${error.message}`);
  }
};

export default fetchGitHubItemCount;
