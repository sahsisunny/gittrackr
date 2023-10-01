import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import FetchIssuePr from '@/utils/FetchIssuePr';
import {
  GITHUB_SEARCH_ISSUES_URL,
  GITHUB_PAGINATION_HUNDRED,
} from '@/constants/url';

import DashBoardHeader from '@/components/Dashboards/DashBoardHeader';
import DashboardSidebar from '@/components/Dashboards/DashboardSidebar';
import DashboardIssues from '@/components/Dashboards/DashboardIssues';

const Dashboard = () => {
  const { data: session } = useSession({ required: true });
  const [activeTab, setActiveTab] = useState('issues');
  const [searchQuery, setSearchQuery] = useState('');
  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [allIssuesCount, setAllIssuesCount] = useState(0);
  const [allPrsCount, setAllPrsCount] = useState(0);
  const [assignedIssuesCount, setAssignedIssuesCount] = useState(0);
  const [closedIssuesCount, setClosedIssuesCount] = useState(0);
  const [ownIssuesCount, setOwnIssuesCount] = useState(0);
  const [openPrsCount, setOpenPrsCount] = useState(0);
  const [closedPrsCount, setClosedPrsCount] = useState(0);
  const [mergedPrsCount, setMergedPrsCount] = useState(0);

  let allIssues = [];
  let allPrs = [];

  const USERNAME = session?.user?.login;
  const NAME = session?.user?.name;
  const TOKEN = session?.accessToken;

  const router = useRouter();
  let { dashboard } = router.query;

  const filterIssues = (data) => {
    return data.filter((issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    if (session) {
      if (dashboard === USERNAME) {
        dashboard = null;
      }
      console.log(dashboard);
      const commonQuery = dashboard
        ? `+org:${dashboard}+${GITHUB_PAGINATION_HUNDRED}`
        : `+${GITHUB_PAGINATION_HUNDRED}`;

      const ALL_ISSUES_URL = `${GITHUB_SEARCH_ISSUES_URL}?q=type:issue+assignee:${USERNAME}${commonQuery}`;
      const ALL_PRS_URL = `${GITHUB_SEARCH_ISSUES_URL}?q=type:pr+author:${USERNAME}${commonQuery}`;

      FetchIssuePr(ALL_ISSUES_URL, TOKEN, (data) => {
        allIssues = data.items;
        setAssignedIssuesCount(
          allIssues.filter((issue) => issue.assignee?.login === USERNAME).length
        );
        setClosedIssuesCount(
          allIssues.filter((issue) => issue.state === 'closed').length
        );
        setOwnIssuesCount(
          allIssues.filter((issue) => issue.user.login === USERNAME).length
        );
        setIssuesData(filterIssues(allIssues));
        setAllIssuesCount(data.total_count);
      });

      FetchIssuePr(ALL_PRS_URL, TOKEN, (data) => {
        allPrs = data.items;
        setOpenPrsCount(allPrs.filter((pr) => pr.state === 'open').length);
        setClosedPrsCount(allPrs.filter((pr) => pr.state === 'closed').length);
        setMergedPrsCount(
          allPrs.filter((item) => item.pull_request.merged_at !== null).length
        );
        setPrsData(filterIssues(allPrs));
        setAllPrsCount(data.total_count);
      });
    }
  }, [session, USERNAME, dashboard]);

  useEffect(() => {
    setIssuesData(filterIssues(allIssues));
    setPrsData(filterIssues(allPrs));
  }, [searchQuery]);

  return (
    <Layout title={`${NAME ? `${NAME} ` : USERNAME} | Dashboard`}>
      <div className="main-container-profile">
        <DashBoardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          AVATAR_URL={session?.user?.image}
          NAME={NAME ? NAME : USERNAME}
        />
        <div className="section-details">
          <DashboardSidebar
            ASSIGNED_ISSUES={assignedIssuesCount}
            CLOSED_ISSUES={closedIssuesCount}
            OWN_ISSUES={ownIssuesCount}
            ALL_ISSUES={allIssuesCount}
            OPEN_PRS={openPrsCount}
            CLOSED_PRS={closedPrsCount}
            MERGED_PRS={mergedPrsCount}
            ALL_PRS={allPrsCount}
          />

          <div className="section-main">
            <DashboardIssues
              issues={activeTab === 'issues' ? issuesData : prsData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </Layout>
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
