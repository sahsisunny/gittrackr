const getRepoNameFromUrl = (url) => {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const parts = pathname.split('/');
  const repoName = parts[parts.length - 1];
  return repoName;
};

export default getRepoNameFromUrl;
