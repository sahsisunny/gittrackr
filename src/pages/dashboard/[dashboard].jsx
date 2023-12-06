import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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

  const router = useRouter();
  let { dashboard } = router.query;

  const [activeTab, setActiveTab] = useState('issues');
  const [searchQuery, setSearchQuery] = useState('');
  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState(issuesData);
  const [filteredPrs, setFilteredPrs] = useState(prsData);

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

  const TOKEN = session?.accessToken;
  const USERNAME = session?.user?.login;
  const NAME = dashboard ? dashboard : session?.user?.name;

  const filterIssues = (data) => {
    const filteredIssues = data.filter((issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIssues(filteredIssues);
  };

  const filterPrs = (data) => {
    const filteredPrs = data.filter((pr) =>
      pr.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrs(filteredPrs);
  };

  useEffect(() => {
    if (session) {
      if (dashboard === USERNAME) {
        dashboard = null;
      }
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
        setIssuesData(allIssues);
        setFilteredIssues(allIssues);
        setAllIssuesCount(data.total_count);
      });

      FetchIssuePr(ALL_PRS_URL, TOKEN, (data) => {
        allPrs = data.items;
        setOpenPrsCount(allPrs.filter((pr) => pr.state === 'open').length);
        setClosedPrsCount(allPrs.filter((pr) => pr.state === 'closed').length);
        setMergedPrsCount(
          allPrs.filter((item) => item.pull_request.merged_at !== null).length
        );
        setPrsData(allPrs);
        setFilteredPrs(allPrs);
        setAllPrsCount(data.total_count);
      });
    }
  }, [session, USERNAME, dashboard]);

  useEffect(() => {
    if (activeTab === 'issues') {
      filterIssues(issuesData);
    } else {
      filterPrs(prsData);
    }
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
              filteredIssuesPrs={
                activeTab === 'issues' ? filteredIssues : filteredPrs
              }
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
