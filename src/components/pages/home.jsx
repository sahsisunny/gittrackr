import React from 'react';
import axios from 'axios';
import './home.css'
import IssueListCard from '../tableDataCard/index'
import TableHeadCard from '../tableHeadCard';
import Filters from '../Filters';
import Checkbox from '../Filters/checkbox';


const USERNAME = localStorage.getItem('username');
const ORG = localStorage.getItem('orgname');
console.log(USERNAME, ORG);
const GITHUB_BASE_URL = `https://api.github.com/search/issues?q=type`;
const GITHUB_API_URL_ISSUES = `${GITHUB_BASE_URL}:issue+assignee:${USERNAME}+org:${ORG}`;
const GITHUB_API_URL_PR = `${GITHUB_BASE_URL}:pr+author:${USERNAME}+org:${ORG}`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const HUNDRED_PER_PAGE = '+&per_page=200&page=1';

const Home = () => {
  const [prs, setPrs] = React.useState([]);
  const [prSummary, setPrSummary] = React.useState([]);
  const [prSummary2, setPrSummary2] = React.useState([]);
  const [issues, setIssues] = React.useState([]);
  const [issueSummary, setIssueSummary] = React.useState([]);
  const [issueSummary2, setIssueSummary2] = React.useState([]);
  const [openIssue, setOpenIssue] = React.useState(false);
  const [closedIssue, setClosedIssue] = React.useState(false);
  const [allIssue, setAllIssue] = React.useState(true);
  const [openPr, setOpenPr] = React.useState(false);
  const [closedPr, setClosedPr] = React.useState(false);
  const [mergedPr, setMergedPr] = React.useState(false);
  const [allPr, setAllPr] = React.useState(true);

  const handleOpenIssue = () => {
    setOpenIssue(!openIssue);
    setClosedIssue(false);
    setAllIssue(false);
  }

  function handleClosedIssue() {
    setClosedIssue(!closedIssue);
    setOpenIssue(false);
    setAllIssue(false);
  }

  function handleAllIssue() {
    setAllIssue(!allIssue);
    setOpenIssue(false);
    setClosedIssue(false);
  }

  const handleOpenPr = () => {
    setOpenPr(!openPr);
    setClosedPr(false);
    setMergedPr(false);
    setAllPr(false);
  }

  function handleClosedPr() {
    setClosedPr(!closedPr);
    setOpenPr(false);
    setMergedPr(false);
    setAllPr(false);
  }

  function handleMergedPr() {
    setMergedPr(!mergedPr);
    setOpenPr(false);
    setClosedPr(false);
    setAllPr(false);
  }

  function handleAllPr() {
    setAllPr(!allPr);
    setOpenPr(false);
    setClosedPr(false);
    setMergedPr(false);
  }

  React.useEffect(() => {
    async function getAllPrs() {
      const options = {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      };
      const url = allPr
        ? `${GITHUB_API_URL_PR}${HUNDRED_PER_PAGE}`
        : openPr
          ? `${GITHUB_API_URL_PR}+state:open+${HUNDRED_PER_PAGE}`
          : closedPr && mergedPr
            ? `${GITHUB_BASE_URL}:issue+is:pr+author:${USERNAME}+org:${ORG}+state:closed+${HUNDRED_PER_PAGE}`
            : closedPr
              ? `${GITHUB_BASE_URL}:issue+is:pr+-is:merged+author:${USERNAME}+org:${ORG}+state:closed+${HUNDRED_PER_PAGE}`
              : mergedPr
                ? `${GITHUB_BASE_URL}:issue+is:pr+is:merged+author:${USERNAME}+org:${ORG}+state:closed+${HUNDRED_PER_PAGE}`
                : GITHUB_API_URL_PR;
      
      axios.get(url, options)
        .then((response) => {
          setPrs(response.data.items);
        })
      axios.get(GITHUB_API_URL_PR + HUNDRED_PER_PAGE, options)
        .then((response) => {
          setPrSummary(response.data.items);
          setPrSummary2(response.data);
        })
    }

    async function getAllIssues() {
      const options = {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      };

      const GITHUB_API_URL_ISSUES_NEW = allIssue
        ? GITHUB_API_URL_ISSUES + HUNDRED_PER_PAGE
        : `${GITHUB_API_URL_ISSUES}${openIssue ? `+state:open+${HUNDRED_PER_PAGE}` : ''}${closedIssue ? `+state:closed+${HUNDRED_PER_PAGE}` : ''}`;

      axios.get(GITHUB_API_URL_ISSUES_NEW, options)
        .then((response) => {
          setIssues(response.data.items);
        })
      axios.get(GITHUB_API_URL_ISSUES + HUNDRED_PER_PAGE, options)
        .then((response) => {
          setIssueSummary(response.data.items);
          setIssueSummary2(response.data);
        })
    }
    getAllPrs();
    getAllIssues();
  }, [openIssue, closedIssue, openPr, closedPr, mergedPr, allPr, allIssue]);

  return (
    <div className='home'>
      <div className="left">

        <TableHeadCard
          title="Issues"
        >
          {
            issues.map((item, i) => <IssueListCard key={i}
              sn={i + 1}
              title={item.title}
              status={item.state}
              onClick={() => {
                window.open(item.html_url);
                console.log(item.pull_request.merged)
              }
              }
            />)
          }
        </TableHeadCard>
      </div>
      <div className="right">
        <TableHeadCard
          title="Pulll Requests"
        >
          {
            prs.map((item, i) => <IssueListCard key={i}
              sn={i + 1}
              title={item.title}
              status={item.state}
              merged={item.pull_request.merged_at !== null}
              onClick={() => {
                window.open(item.html_url);
                console.log(item.pull_request.merged)
              }
              }
            />)
          }
        </TableHeadCard>
      </div>
      <div className="sidebar">
        <h1>Summary</h1>
        <div className="summary">
          <div className="issues">
            <table>
              <caption>Issues</caption>
              <tbody>
                <tr>
                  <th>Assigned Issues</th>
                  <th>:</th>
                  <td className="assigned-issues">{issueSummary.filter(pr => pr.state === 'open').length}</td>
                </tr>
                <tr>
                  <th>Closed Issues</th>
                  <th>:</th>
                  <td className="closed-issues">
                    {issueSummary.filter(function (item) {
                      return item.state === "closed";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Own Issues</th>
                  <th>:</th>
                  <td className="own-issues">
                    {issueSummary.filter(function (item) {
                      const { user } = item;
                      return user.login === USERNAME;
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>All Issues</th>
                  <th>:</th>
                  <td className="all-issues">
                    {issueSummary2.total_count}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pull">
            <table>
              <caption>PR's</caption>
              <tbody>
                <tr>
                  <th>Open PR's</th>
                  <th>:</th>
                  <td className="open-prs">
                    {prSummary.filter(function (item) {
                      return item.state === "open";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Closed PR's</th>
                  <th>:</th>
                  <td className="closed-prs">
                    {prSummary.filter(function (item) {
                      return item.state === "closed";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Merged PR's</th>
                  <th>:</th>
                  <td className="merged-prs">
                    {prSummary.filter(function (item) {
                      const { pull_request } = item;
                      return pull_request.merged_at !== null;
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th> All PR's</th>
                  <th>:</th>
                  <td className="all-prs">
                    {prSummary2.total_count}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="filters">
          <h2>Issue Filters</h2>
          <Filters>
            <Checkbox
              label="Open"
              isChecked={openIssue}
              onChange={() => handleOpenIssue()}
            />
            <Checkbox
              label="Closed"
              isChecked={closedIssue}
              onChange={() => handleClosedIssue()}
            />
            <Checkbox
              label="All"
              isChecked={allIssue}
              onChange={() => handleAllIssue()}
            />
          </Filters>
        </div>
        <div className="filters">
          <h2>PR Filters</h2>
          <Filters>
            <Checkbox
              label="Open"
              isChecked={openPr}
              onChange={() => handleOpenPr()}
            />
            <Checkbox
              label="Closed"
              isChecked={closedPr}
              onChange={() => handleClosedPr()}
            />
            <Checkbox
              label="Merged"
              isChecked={mergedPr}
              onChange={() => handleMergedPr()}
            />
            <Checkbox
              label="All"
              isChecked={allPr}
              onChange={() => handleAllPr()}
            />
          </Filters>
        </div>
      </div>
    </div>
  );
}

export default Home;
