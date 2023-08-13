function getRepoUrl(url) {
  const urlParts = url.split('/');
  const issueIndex = urlParts.indexOf('issues');
  const pullIndex = urlParts.indexOf('pull');
  if (issueIndex !== -1) {
    urlParts.splice(issueIndex, 2);
  } else if (pullIndex !== -1) {
    urlParts.splice(pullIndex, 2);
  }
  return urlParts.join('/');
}
export default getRepoUrl;
