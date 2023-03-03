const username = "sahsisunny";
const org = "Real-Dev-Squad";
const token = "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";
let totalPRs = 0;
let closedPRs = 0;
let openPRs = 0;
let mergedPRs = 0;
let totalissues = 0;
let closedissues = 0;
let openissues = 0;
let ownIssues = 0;
const prbody = document.querySelector('.pr-body');
const issuebody = document.querySelector('.issue-body');
const assignedIssuesCounts = document.querySelector('.assigned-issues');
const closedIssuesCounts = document.querySelector('.closed-issues');
const openPrsCount = document.querySelector('.open-prs');
const closedPrsCount = document.querySelector('.closed-prs');
const openIssuesCount = document.querySelector('.own-issues');
const mergedPrsCount = document.querySelector('.merged-prs');

function getAllPrs() {
     fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}+org:${org}`, {
          headers: {
               "Authorization": `token ${token}`
          }
     })
          .then(response => response.json())
          .then(data => {
               totalPRs = data.total_count;
               closedPRs = data.items.filter(pr => pr.state === 'closed').length;
               openPRs = data.items.filter(pr => pr.state === 'open').length;
               mergedPRs = data.items.filter(pr => pr.pull_request.merged_at !== null).length;
               data.items.forEach((pr, index) => {
                    const trow = document.createElement('tr');
                    trow.innerHTML = `
                         <td>${index + 1}</td>
                         <td>${pr.title}</td>
                         <td><a href="${pr.html_url}" target="_blank" class="btn"   >${pr.state}</a></td>
                         `;
                    prbody.innerHTML += trow.outerHTML;
               })
               openPrsCount.innerHTML = openPRs;
               closedPrsCount.innerHTML = closedPRs;
               mergedPrsCount.innerHTML = mergedPRs;
          })
          .catch(error => console.error(error));
}

function getAllIssues() {
     fetch(`https://api.github.com/search/issues?q=type:issue+assignee:${username}+org:${org}`, {
          headers: {
               "Authorization": `token ${token}`
          }
     })
          .then(response => response.json())
          .then(data => {
               totalissues = data.total_count;
               closedissues = data.items.filter(pr => pr.state === 'closed').length;
               openissues = data.items.filter(pr => pr.state === 'open').length;
               ownIssues = data.items.filter(pr => pr.user.login === username).length;
               data.items.forEach((pr, index) => {
                    const trow = document.createElement('tr');
                    trow.innerHTML = `
                         <td>${index + 1}</td>
                         <td>${pr.title}</td>
                         <td><a href="${pr.html_url}" target="_blank" class="btn"   >${pr.state}</a></td>
                         `;
                    issuebody.innerHTML += trow.outerHTML;
               })
               assignedIssuesCounts.innerHTML = openissues;
               closedIssuesCounts.innerHTML = closedissues;
               openIssuesCount.innerHTML = ownIssues;
          })
          .catch(error => console.error(error));
}

getAllPrs();
getAllIssues();
