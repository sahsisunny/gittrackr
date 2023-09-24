import {
  GITHUB_PAGINATION_HUNDRED,
  GITHUB_SEARCH_ISSUES_URL,
} from '@/constants/url';

function generateGitHubURL(
  type: string,
  username: string,
  state = '',
  pagination = GITHUB_PAGINATION_HUNDRED
): string {
  const baseURL = `${GITHUB_SEARCH_ISSUES_URL}?q=`;
  let queryString = '';

  switch (type) {
    case 'all_issues':
      queryString = `type:issue+author:${username}+${pagination}`;
      break;
    case 'all_prs':
      queryString = `type:pr+author:${username}+${pagination}`;
      break;
    case 'assigned_issues':
      queryString = `type:issue+assignee:${username}+${pagination}`;
      break;
    case 'closed_assigned_issues':
      queryString = `type:issue+assignee:${username}+state:closed+${pagination}`;
      break;
    case 'own_issues':
      queryString = `type:issue+author:${username}+${pagination}`;
      break;
    case 'closed_own_issues':
      queryString = `type:issue+author:${username}+state:closed+${pagination}`;
      break;
    case 'open_prs':
      queryString = `type:pr+author:${username}+state:open+${pagination}`;
      break;
    case 'closed_prs':
      queryString = `type:pr+author:${username}+state:closed+${pagination}`;
      break;
    case 'merged_prs':
      queryString = `type:pr+author:${username}+is:merged+${pagination}`;
      break;
    default:
      throw new Error('Invalid type');
  }

  return `${baseURL}${queryString}`;
}

export default generateGitHubURL;
