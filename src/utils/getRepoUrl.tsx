function getRepoUrl(url: string): string {
  const urlParts: string[] = url.split('/');
  const issueIndex: number = urlParts.indexOf('issues');
  const pullIndex: number = urlParts.indexOf('pull');

  if (issueIndex !== -1) {
    urlParts.splice(issueIndex, 2);
  } else if (pullIndex !== -1) {
    urlParts.splice(pullIndex, 2);
  }

  return urlParts.join('/');
}

export default getRepoUrl;
