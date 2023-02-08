const inputUsername = document.querySelector('#username');
const viewBtn = document.querySelector('#view-details');
const closeBTN = document.querySelector('.close-btn');

const headerSection = document.querySelector('.header');
const dashboardSection = document.querySelector('.main');
const footerSection = document.querySelector('footer');
const floatingArea = document.querySelector('.floating-box');

const prbody = document.querySelector('.pr-body');
const issuebody = document.querySelector('.issue-body');
const assignedIssuesCounts = document.querySelector('.assigned-issues');
const closedIssuesCounts = document.querySelector('.closed-issues');
const openPrsCount = document.querySelector('.open-prs');
const closedPrsCount = document.querySelector('.closed-prs');
const openIssuesCount = document.querySelector('.own-issues');
const mergedPrsCount = document.querySelector('.merged-prs');

const ORG_NAME = "Real-Dev-Squad";
const GITHUB_TOKEN = "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";
const BASE_URL = "https://api.github.com/search/issues?";

let username = "";
let totalPRs = 0;
let closedPRs = 0;
let openPRs = 0;
let mergedPRs = 0;
let totalissues = 0;
let closedissues = 0;
let openissues = 0;
let ownIssues = 0;

inputUsername.addEventListener('change', () => {
     username = inputUsername.value;
     viewBtn.disabled = username === '';
});

async function getPrsData(username) {
     const response = await fetch(`${BASE_URL}q=type:pr+author:${username}+org:${ORG_NAME}`, {
          headers: {
               Authorization: `token ${GITHUB_TOKEN}`
          }
     });
     return response.json();
}


function getAllPrs() {
     const username = inputUsername.value;
     if (!username) return;

     getPrsData(username)
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
               });
               openPrsCount.innerHTML = openPRs;
               closedPrsCount.innerHTML = closedPRs;
               mergedPrsCount.innerHTML = mergedPRs;
          })
          .catch(error => console.error(error));
}


function filterClosedIssues(data) {
     return data.items.filter(pr => pr.state === 'closed').length;
}

function filterOpenIssues(data) {
     return data.items.filter(pr => pr.state === 'open').length;
}

function filterOwnIssues(data) {
     return data.items.filter(pr => pr.user.login === username).length;
}

function createIssueRow(pr, index) {
     const trow = document.createElement('tr');
     trow.innerHTML = `
          <td>${index + 1}</td>
          <td>${pr.title}</td>
          <td><a href="${pr.html_url}" target="_blank" class="btn"   >${pr.state}</a></td>
     `;
     return trow.outerHTML;
}

function updateIssueCounts(data) {
     assignedIssuesCounts.innerHTML = filterOpenIssues(data);
     closedIssuesCounts.innerHTML = filterClosedIssues(data);
     openIssuesCount.innerHTML = filterOwnIssues(data);
}

function getAllIssues() {
     fetch(`${BASE_URL}q=type:issue+assignee:${username}+org:${ORG_NAME}`, {
          headers: {
               "Authorization": `token ${GITHUB_TOKEN}`
          }
     })
          .then(response => response.json())
          .then(data => {
               totalissues = data.total_count;
               data.items.forEach((pr, index) => {
                    issuebody.innerHTML += createIssueRow(pr, index);
               });
               updateIssueCounts(data);
          })
          .catch(error => console.error(error));
}


function removeBlur() {
     headerSection.classList.remove('blur');
     dashboardSection.classList.remove('blur');
     footerSection.classList.remove('blur');
     floatingArea.classList.add('hide');
}

function viewDetails() {
     const username = inputUsername.value;
     if (username !== '') {
          removeBlur();
          getAllPrs();
          getAllIssues();
     } else {
          alert('Please enter a valid username');
     }
}

viewBtn.addEventListener('click', viewDetails);
