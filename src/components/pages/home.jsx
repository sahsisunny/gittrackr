import React from 'react';
import axios from 'axios';
import './home.css'
import IssueListCard from '../tableDataCard/index'
import TableHeadCard from '../tableHeadCard';


const USERNAME = "sahsisunny";
const ORG = "Real-Dev-Squad";
const GITHUB_BASE_URL = `https://api.github.com/search/issues?q=type`;
const GITHUB_API_URL_ISSUES = `${GITHUB_BASE_URL}:issue+assignee:${USERNAME}+org:${ORG}`;
const GITHUB_API_URL_PR = `${GITHUB_BASE_URL}:pr+author:${USERNAME}+org:${ORG}`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function Home() {
  const [prs, setPrs] = React.useState([]);
  const [issues, setIssues] = React.useState([]);

  async function getAllPrs() {
    const options = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    };

    axios.get(GITHUB_API_URL_PR, options)
      .then((response) => {
        setPrs(response.data.items);
      })
  }


  async function getAllIssues() {
    const options = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    };
    axios.get(GITHUB_API_URL_ISSUES, options)
      .then((response) => {
        setIssues(response.data.items);
      })
  }

  React.useEffect(() => {
    getAllPrs();
    getAllIssues();
  }, []);

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
                  <td className="assigned-issues">{issues.filter(pr => pr.state === 'open').length}</td>
                </tr>
                <tr>
                  <th>Closed Issues</th>
                  <th>:</th>
                  <td className="closed-issues">
                    {issues.filter(function (item) {
                      return item.state === "closed";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Own Issues</th>
                  <th>:</th>
                  <td className="own-issues">
                    {issues.filter(function (item) {
                      const { user } = item;
                      return user.login === USERNAME;
                    }).length}
                  </td>
                </tr>
                {/* all issue */}
                <tr>
                  <th>All Issues</th>
                  <th>:</th>
                  <td className="all-issues">
                    {issues.length}
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
                    {prs.filter(function (item) {
                      return item.state === "open";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Closed PR's</th>
                  <th>:</th>
                  <td className="closed-prs">
                    {prs.filter(function (item) {
                      return item.state === "closed";
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th>Merged PR's</th>
                  <th>:</th>
                  <td className="merged-prs">
                    {prs.filter(function (item) {
                      const { pull_request } = item;
                      return pull_request.merged_at !== null;
                    }).length}
                  </td>
                </tr>
                <tr>
                  <th> All PR's</th>
                  <th>:</th>
                  <td className="all-prs">
                    {prs.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
