import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import fetchData from '@/utils/FetchData';
import FetchIssuePr from '@/utils/FetchIssuePr';
import { GITHUB_USER_URL, GITHUB_SEARCH_ISSUES_URL, GITHUB_PAGINATION_HUNDRED } from '@/constants/url';
import { useState, useEffect } from 'react';


const Dashboard = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);

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
        FetchIssuePr(issueUrl, token, setIssuesData);
      }
      if (prUrl) {
        FetchIssuePr(prUrl, token, setPrsData);
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
          <div className="repo-list">
            {prsData.map((pr) => (
              <div key={pr.id}>
                <div
                  className="repo-item"
                  onClick={() => {
                    window.open(`${pr.html_url}`, '_blank');
                  }}
                ><div className="repo-details">

                    <div className="repo-item-left">
                      <span
                        className="repo-item-name"
                      >{pr.title}</span>
                    </div>
                    <div className="repo-item-right">
                    </div>
                  </div>
                  <button
                    className="issue-view-btn"
                    onClick={() => {
                      window.open(`${pr.html_url}`, '_blank');
                    }}
                  >
                    {
                      pr.state === 'open' ? 'Open' :
                        pr.pull_request.merged_at !== null ? 'Merged' : 'Closed'

                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-two">
          <h5 className="section-title">Issues</h5>
          <div className="repo-list">
            {issuesData.map((issue) => (
              <div key={issue.id}>
                <div
                  className="repo-item"
                  onClick={() => {
                    window.open(`${issue.html_url}`, '_blank');
                  }}
                ><div className="repo-details">

                    <div className="repo-item-left">
                      <span
                        className="repo-item-name"
                      >{issue.title}</span>
                    </div>
                    <div className="repo-item-right">
                    </div>
                  </div>
                  <button
                    className="issue-view-btn"
                    onClick={() => {
                      window.open(`${issue.html_url}`, '_blank');
                    }}
                  >
                    {
                      issue.state === 'open' ? 'Open' : 'Closed'
                    }
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
