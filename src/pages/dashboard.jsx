import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import fetchData from '@/utils/FetchData';
import FetchIssuePr from '@/utils/FetchIssuePr';
import {
  GITHUB_USER_URL,
  GITHUB_SEARCH_ISSUES_URL,
  GITHUB_PAGINATION_HUNDRED,
} from '@/constants/url';
import { useState, useEffect } from 'react';
import getRepoNameFromUrl from '@/utils/getRepoNameFromUrl';
import FormatDate from '@/utils/FormatDate';
import getRepoUrl from '@/utils/getRepoUrl';

const Dashboard = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [prFilterData, setPrFilterData] = useState([]);

  const filterIssues = (status) => {
    if (status === 'open') {
      const openIssues = issuesData.filter((issue) => issue.state === 'open');
      setFilterData(openIssues);
    } else if (status === 'closed') {
      const closedIssues = issuesData.filter(
        (issue) => issue.state === 'closed'
      );
      setFilterData(closedIssues);
    } else {
      setFilterData(issuesData);
    }
  };

  const filterPrs = (status) => {
    if (status === 'open') {
      const openPrs = prsData.filter((pr) => pr.state === 'open');
      setPrFilterData(openPrs);
    } else if (status === 'closed') {
      const closedPrs = prsData.filter((pr) => pr.state === 'closed');
      setPrFilterData(closedPrs);
    } else {
      setPrFilterData(prsData);
    }
  };

  useEffect(() => {
    if (session) {
      const userUrl = GITHUB_USER_URL;
      const token = session?.accessToken;

      fetchData(userUrl, token, setData);
    }
  }, [session]);

  useEffect(() => {
    if (session && data) {
      const issueUrl = `${GITHUB_SEARCH_ISSUES_URL}?q=type:issue+author:${data.login}+${GITHUB_PAGINATION_HUNDRED}`;
      const prUrl = `${GITHUB_SEARCH_ISSUES_URL}?q=type:pr+author:${data.login}+${GITHUB_PAGINATION_HUNDRED}`;
      const token = session.accessToken;
      if (issueUrl) {
        FetchIssuePr(issueUrl, token, (issues) => {
          setIssuesData(issues);
          setFilterData(issues);
        });
      }
      if (prUrl) {
        FetchIssuePr(prUrl, token, (prs) => {
          setPrsData(prs);
          setPrFilterData(prs);
        });
      }
    }
  }, [session, data]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <div className="main-container">
        <div className="section-one">
          <h5 className="section-title">Pull Requests</h5>
          <div className="repo-filters">
            <div className="radio-inputs">
              <label className="radio">
                <input
                  type="radio"
                  name="radio"
                  defaultChecked
                  onChange={() => {
                    filterPrs('all');
                  }}
                />
                <span className="name">All</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    filterPrs('open');
                  }}
                />
                <span className="name">Open</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    filterPrs('closed');
                  }}
                />
                <span className="name">closed</span>
              </label>
            </div>
          </div>
          <div className="repo-list">
            {prFilterData.map((pr) => (
              <div key={pr.id}>
                <div
                  className="repo-item"
                >
                  <div className="repo-details">
                    <div className="repo-item-left">
                      <span className="repo-item-name">{pr.title}</span>
                    </div>
                    <div className="repo-item-right">
                      <span
                        className="repo-item-privacy"
                        onClick={() => {
                          window.open(`${getRepoUrl(pr.html_url)}`, '_blank');
                        }}
                      >
                        {getRepoNameFromUrl(pr.repository_url)}
                      </span>
                      <span className="repo-item-updated">
                        {FormatDate(pr.updated_at)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="issue-view-btn"
                    onClick={() => {
                      window.open(`${pr.html_url}`, '_blank');
                    }}
                  >
                    {pr.state === 'open'
                      ? 'Open'
                      : pr.pull_request.merged_at !== null
                      ? 'Merged'
                      : 'Closed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-two">
          <h5 className="section-title">Issues</h5>
          <div className="repo-filters">
            <div className="radio-inputs">
              <label className="radio">
                <input
                  type="radio"
                  name="radio-two"
                  defaultChecked
                  onChange={() => {
                    filterIssues('all');
                  }}
                />
                <span className="name">All</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="radio-two"
                  onChange={() => {
                    filterIssues('open');
                  }}
                />
                <span className="name">Open</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="radio-two"
                  onChange={() => {
                    filterIssues('closed');
                  }}
                />
                <span className="name">Close</span>
              </label>
            </div>
          </div>
          <div className="repo-list">
            {filterData.map((issue) => (
              <div key={issue.id}>
                <div
                  className="repo-item"
                >
                  <div className="repo-details">
                    <div className="repo-item-left">
                      <span className="repo-item-name">{issue.title}</span>
                    </div>
                    <div className="repo-item-right">
                      <span
                        className="repo-item-privacy"
                        onClick={() => {
                          window.open(
                            `${getRepoUrl(issue.html_url)}`,
                            '_blank'
                          );
                        }}
                      >
                        {getRepoNameFromUrl(issue.repository_url)}
                      </span>
                      <span className="repo-item-updated">
                        {FormatDate(issue.created_at)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="issue-view-btn"
                    onClick={() => {
                      window.open(`${issue.html_url}`, '_blank');
                    }}
                  >
                    {issue.state === 'open' ? 'Open' : 'Closed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
