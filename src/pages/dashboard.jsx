import React from 'react';
import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FetchIssuePr from '@/utils/FetchIssuePr';
import generateGitHubURL from '@/utils/generateGitHubURL';
import fetchGitHubItemCount from '@/utils/fetchGitHubItemCount';

import DashBoardHeader from '@/components/Dashboards/DashBoardHeader';
import DashboardSidebar from '@/components/Dashboards/DashboardSidebar';
import DashboardIssues from '@/components/Dashboards/DashboardIssues';

const MyDashboard = () => {
  const { data: session } = useSession({ required: true });
  const [activeTab, setActiveTab] = useState('issues');
  const [searchQuery, setSearchQuery] = useState('');
  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [itemCounts, setItemCounts] = useState({
    ASSIGNED_ISSUES: 0,
    CLOSED_ISSUES: 0,
    OWN_ISSUES: 0,
    ALL_ISSUES: 0,
    OPEN_PRS: 0,
    CLOSED_PRS: 0,
    MERGED_PRS: 0,
    ALL_PRS: 0,
  });
  let allIssues = [];
  let allPrs = [];

  const USERNAME = session?.user?.login;
  const NAME = session?.user?.name;
  const TOKEN = session?.accessToken;

  const filterIssues = () => {
    const filtered = issuesData.filter((issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setIssuesData(filtered);
  };

  const filterPrs = () => {
    const filtered = prsData.filter((pr) =>
      pr.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPrsData(filtered);
  };

  useEffect(() => {
    if (session) {
      const ALL_ISSUES_URL = generateGitHubURL('all_issues', USERNAME);
      const ALL_PRS_URL = generateGitHubURL('all_prs', USERNAME);

      FetchIssuePr(ALL_ISSUES_URL, TOKEN, (issues) => {
        allIssues = issues;
        setIssuesData(issues);
        setItemCounts(() => ({}));
      });

      FetchIssuePr(ALL_PRS_URL, TOKEN, (prs) => {
        allPrs = prs;
        setPrsData(prs);
      });
    }
  }, [session, USERNAME]);

  useEffect(() => {
    filterIssues();
    filterPrs();
  }, [searchQuery]);

  useEffect(() => {
    setItemCounts(() => ({
      ASSIGNED_ISSUES: allIssues.filter((issue) => issue.state === 'open')
        .length,
      CLOSED_ISSUES: allIssues.filter((issue) => issue.state === 'closed')
        .length,
      OWN_ISSUES: allIssues.filter((issue) => issue.user.login === USERNAME)
        .length,
      ALL_ISSUES: allIssues.length,
      OPEN_PRS: allPrs.filter((pr) => pr.state === 'open').length,
      CLOSED_PRS: allPrs.filter((pr) => pr.state === 'closed').length,
      MERGED_PRS: allPrs.filter((pr) => pr.state === 'merged').length,
      ALL_PRS: allPrs.length,
    }));
  }, [allIssues, allPrs]);

  return (
    <>
      <Head>
        <title>{NAME ? `${NAME} ` : USERNAME} | Dashboard</title>
      </Head>
      <Navbar />
      <div className="main-container-profile">
        <DashBoardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          AVATAR_URL={session?.user?.image}
          NAME={NAME ? NAME : USERNAME}
        />
        <div className="section-details">
          <DashboardSidebar
            ASSIGNED_ISSUES={itemCounts.ASSIGNED_ISSUES}
            CLOSED_ISSUES={itemCounts.CLOSED_ISSUES}
            OWN_ISSUES={itemCounts.OWN_ISSUES}
            ALL_ISSUES={itemCounts.ALL_ISSUES}
            OPEN_PRS={itemCounts.OPEN_PRS}
            CLOSED_PRS={itemCounts.CLOSED_PRS}
            MERGED_PRS={itemCounts.MERGED_PRS}
            ALL_PRS={itemCounts.ALL_PRS}
          />

          <div className="section-main">
            {activeTab === 'issues' ? (
              <DashboardIssues
                issues={issuesData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <DashboardIssues
                issues={prsData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
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

export default MyDashboard;
