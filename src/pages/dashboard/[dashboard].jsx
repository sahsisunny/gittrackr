import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGitPullRequest,
  FiGitMerge,
  FiInfo,
  FiActivity,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

import Layout from '@/components/Layout';
import FetchIssuePr, { fetchPaginatedGitHubData } from '@/utils/FetchIssuePr';
import {
  GITHUB_SEARCH_ISSUES_URL,
} from '@/constants/url';
import {
  DEMO_USER,
  DEMO_PRS,
  DEMO_ISSUES,
} from '@/mocks/demoData';

import DashBoardHeader from '@/components/Dashboards/DashBoardHeader';
import DashboardSidebar from '@/components/Dashboards/DashboardSidebar';
import DashboardIssues from '@/components/Dashboards/DashboardIssues';
import VelocityChart from '@/components/Analytics/VelocityChart';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dashboard } = router.query;

  const [activeTab, setActiveTab] = useState('issues');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTelemetryGraph, setShowTelemetryGraph] = useState(false);

  const [issuesData, setIssuesData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [issuesTotalCount, setIssuesTotalCount] = useState(0);
  const [prsTotalCount, setPrsTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isDemo = dashboard === 'octocat' || (!session && status !== 'loading');

  const TOKEN = session?.accessToken;
  const USERNAME = session?.user?.login || (isDemo ? DEMO_USER.login : '');
  const NAME =
    dashboard && dashboard !== USERNAME
      ? dashboard
      : session?.user?.name || (isDemo ? DEMO_USER.name : 'Developer');
  const AVATAR_URL = session?.user?.image || (isDemo ? DEMO_USER.image : '');

  // Read initial query params from URL
  useEffect(() => {
    if (router.isReady) {
      if (router.query.tab === 'pullrequests' || router.query.tab === 'issues') {
        setActiveTab(router.query.tab);
      }
      if (typeof router.query.filter === 'string') {
        setStatusFilter(router.query.filter);
      }
      if (typeof router.query.q === 'string') {
        setSearchQuery(router.query.q);
      }
    }
  }, [router.isReady, router.query.tab, router.query.filter, router.query.q]);

  // Sync state changes to URL query
  const syncUrlParams = (newTab, newFilter, newQ) => {
    const nextQuery = { ...router.query };

    if (newTab && newTab !== 'issues') {
      nextQuery.tab = newTab;
    } else {
      delete nextQuery.tab;
    }

    if (newFilter && newFilter !== 'all') {
      nextQuery.filter = newFilter;
    } else {
      delete nextQuery.filter;
    }

    if (newQ && newQ.trim()) {
      nextQuery.q = newQ.trim();
    } else {
      delete nextQuery.q;
    }

    router.push(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // Fetch GitHub issues & PRs or demo data
  useEffect(() => {
    if (isDemo) {
      setIssuesData(DEMO_ISSUES);
      setPrsData(DEMO_PRS);
      setIssuesTotalCount(DEMO_ISSUES.length);
      setPrsTotalCount(DEMO_PRS.length);
      setIsLoading(false);
      return;
    }

    if (session && TOKEN && USERNAME) {
      setIsLoading(true);
      setIssuesData([]);
      setPrsData([]);
      setIssuesTotalCount(0);
      setPrsTotalCount(0);

      const targetOrg = dashboard && dashboard !== USERNAME ? dashboard : null;
      const orgFilter = targetOrg ? `+org:${encodeURIComponent(targetOrg)}` : '';

      const ALL_ISSUES_BASE_URL = `${GITHUB_SEARCH_ISSUES_URL}?q=type:issue+assignee:${USERNAME}${orgFilter}`;
      const ALL_PRS_BASE_URL = `${GITHUB_SEARCH_ISSUES_URL}?q=type:pr+author:${USERNAME}${orgFilter}`;

      fetchPaginatedGitHubData(
        ALL_ISSUES_BASE_URL,
        TOKEN,
        (initial) => {
          setIssuesTotalCount(initial.total_count);
          setIssuesData(initial.items);
          setIsLoading(false);
        },
        (all, total) => {
          setIssuesTotalCount(total);
          setIssuesData(all);
          setIsLoading(false);
        }
      );

      fetchPaginatedGitHubData(
        ALL_PRS_BASE_URL,
        TOKEN,
        (initial) => {
          setPrsTotalCount(initial.total_count);
          setPrsData(initial.items);
          setIsLoading(false);
        },
        (all, total) => {
          setPrsTotalCount(total);
          setPrsData(all);
          setIsLoading(false);
        }
      );
    }
  }, [session, TOKEN, USERNAME, dashboard, isDemo]);

  // Derived counts for sidebar and top KPIs
  const assignedIssuesCount = useMemo(() => {
    return issuesData.filter(
      (i) =>
        i.assignee?.login?.toLowerCase() === USERNAME?.toLowerCase() ||
        i.assignees?.some((a) => a.login?.toLowerCase() === USERNAME?.toLowerCase()) ||
        isDemo
    ).length;
  }, [issuesData, USERNAME, isDemo]);

  const closedIssuesCount = useMemo(() => {
    return issuesData.filter((i) => i.state === 'closed').length;
  }, [issuesData]);

  const ownIssuesCount = useMemo(() => {
    return issuesData.filter(
      (i) =>
        i.user?.login?.toLowerCase() === USERNAME?.toLowerCase() ||
        isDemo
    ).length;
  }, [issuesData, USERNAME, isDemo]);

  const openPrsCount = useMemo(() => {
    return prsData.filter((pr) => pr.state === 'open').length;
  }, [prsData]);

  const closedPrsCount = useMemo(() => {
    return prsData.filter(
      (pr) => pr.state === 'closed' && !pr.pull_request?.merged_at
    ).length;
  }, [prsData]);

  const mergedPrsCount = useMemo(() => {
    return prsData.filter((pr) => Boolean(pr.pull_request?.merged_at)).length;
  }, [prsData]);

  // Filtered issues based on statusFilter and searchQuery
  const filteredIssues = useMemo(() => {
    let list = issuesData;

    if (statusFilter === 'assigned') {
      list = list.filter(
        (i) =>
          i.assignee?.login?.toLowerCase() === USERNAME?.toLowerCase() ||
          i.assignees?.some((a) => a.login?.toLowerCase() === USERNAME?.toLowerCase()) ||
          (isDemo && i.assignee?.login === 'octocat') ||
          i.state === 'open'
      );
    } else if (statusFilter === 'created') {
      list = list.filter(
        (i) =>
          i.user?.login?.toLowerCase() === USERNAME?.toLowerCase() ||
          (isDemo && i.user?.login === 'octocat')
      );
    } else if (statusFilter === 'open') {
      list = list.filter((i) => i.state === 'open');
    } else if (statusFilter === 'closed') {
      list = list.filter((i) => i.state === 'closed');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.repository_url?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [issuesData, statusFilter, searchQuery, USERNAME, isDemo]);

  // Filtered PRs based on statusFilter and searchQuery
  const filteredPrs = useMemo(() => {
    let list = prsData;

    if (statusFilter === 'open') {
      list = list.filter((pr) => pr.state === 'open');
    } else if (statusFilter === 'merged') {
      list = list.filter(
        (pr) => Boolean(pr.pull_request?.merged_at) || pr.state === 'merged'
      );
    } else if (statusFilter === 'closed') {
      list = list.filter(
        (pr) => pr.state === 'closed' && !pr.pull_request?.merged_at
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (pr) =>
          pr.title?.toLowerCase().includes(q) ||
          pr.repository_url?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [prsData, statusFilter, searchQuery]);

  // User interactions
  const handleSelectFilter = (tab, filter) => {
    setActiveTab(tab);
    setStatusFilter(filter);
    syncUrlParams(tab, filter, searchQuery);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
    syncUrlParams(activeTab, filter, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    syncUrlParams(activeTab, statusFilter, query);
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
    syncUrlParams(activeTab, 'all', '');
  };

  const handleTabChange = (newTab) => {
    const validTab = newTab === 'pullrequests' ? 'pullrequests' : 'issues';
    setActiveTab(validTab);
    setStatusFilter('all');
    syncUrlParams(validTab, 'all', searchQuery);
  };

  return (
    <Layout
      title={`${NAME} | Developer Dashboard`}
      description={`Real-time pull requests, issues, and contributor velocity tracking cockpit for ${NAME} on GitTrackr.`}
    >
      <main className="main-container-profile">
        {/* Demo banner if active */}
        {isDemo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.5rem',
              borderRadius: 'var(--radius-md)',
              background:
                'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <FiInfo color="#38bdf8" size={18} />
              <span>
                <strong>Interactive Demo Mode:</strong> Viewing sample developer telemetry for @{DEMO_USER.login}.
              </span>
            </div>
            {!session && (
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="nav-pill-btn"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              >
                Connect Your Account
              </button>
            )}
          </div>
        )}

        <DashBoardHeader
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          AVATAR_URL={AVATAR_URL}
          NAME={NAME}
          issuesCount={issuesTotalCount || issuesData.length}
          prsCount={prsTotalCount || prsData.length}
        />

        {/* Top Clickable KPI Cards */}
        <section className="kpi-grid" aria-label="Key Performance Indicators">
          <button
            type="button"
            className="kpi-card"
            onClick={() => handleSelectFilter('pullrequests', 'open')}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              border:
                activeTab === 'pullrequests' && statusFilter === 'open'
                  ? '1px solid var(--accent-cyan)'
                  : undefined,
            }}
            title="Click to view Open PRs"
          >
            <div className="kpi-header">
              <span>Open PRs</span>
              <FiGitPullRequest color="#38bdf8" size={18} />
            </div>
            <div className="kpi-value" style={{ color: '#38bdf8' }}>
              {openPrsCount}
            </div>
            <div className="kpi-subtext">Awaiting review or merge</div>
          </button>

          <button
            type="button"
            className="kpi-card"
            onClick={() => handleSelectFilter('pullrequests', 'merged')}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              border:
                activeTab === 'pullrequests' && statusFilter === 'merged'
                  ? '1px solid #c084fc'
                  : undefined,
            }}
            title="Click to view Merged PRs"
          >
            <div className="kpi-header">
              <span>Merged PRs</span>
              <FiGitMerge color="#c084fc" size={18} />
            </div>
            <div className="kpi-value" style={{ color: '#c084fc' }}>
              {mergedPrsCount}
            </div>
            <div className="kpi-subtext">Shipped to production</div>
          </button>

          <button
            type="button"
            className="kpi-card"
            onClick={() => handleSelectFilter('issues', 'assigned')}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              border:
                activeTab === 'issues' && statusFilter === 'assigned'
                  ? '1px solid #fbbf24'
                  : undefined,
            }}
            title="Click to view Assigned Issues"
          >
            <div className="kpi-header">
              <span>Assigned Issues</span>
              <FiAlertCircle color="#fbbf24" size={18} />
            </div>
            <div className="kpi-value" style={{ color: '#fbbf24' }}>
              {assignedIssuesCount}
            </div>
            <div className="kpi-subtext">Active tasks on backlog</div>
          </button>

          <button
            type="button"
            className="kpi-card"
            onClick={() => handleSelectFilter('issues', 'closed')}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              border:
                activeTab === 'issues' && statusFilter === 'closed'
                  ? '1px solid #10b981'
                  : undefined,
            }}
            title="Click to view Closed Issues"
          >
            <div className="kpi-header">
              <span>Closed Issues</span>
              <FiCheckCircle color="#10b981" size={18} />
            </div>
            <div className="kpi-value" style={{ color: '#10b981' }}>
              {closedIssuesCount}
            </div>
            <div className="kpi-subtext">Resolved issues</div>
          </button>
        </section>

        {/* Collapsible Telemetry Graph Toggle */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => setShowTelemetryGraph(!showTelemetryGraph)}
            className="nav-pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              fontSize: '0.8125rem',
              background: showTelemetryGraph
                ? 'var(--bg-surface-elevated)'
                : 'transparent',
              borderColor: showTelemetryGraph
                ? 'var(--accent-cyan)'
                : 'var(--border-subtle)',
            }}
            aria-expanded={showTelemetryGraph}
          >
            <FiActivity size={15} color="var(--accent-cyan)" />
            <span>
              {showTelemetryGraph ? 'Hide Velocity Graph' : 'Show Velocity Graph'}
            </span>
            {showTelemetryGraph ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        </div>

        {/* Telemetry Graph (Collapsible) */}
        {showTelemetryGraph && (
          <div style={{ marginBottom: '1.5rem' }}>
            <VelocityChart
              title={`${NAME}'s Velocity & Activity Telemetry`}
              prsData={prsData}
              issuesData={issuesData}
              isDemo={isDemo}
            />
          </div>
        )}

        {/* Main Split Section: Sticky Sidebar + Independently Scrollable List */}
        <div className="section-details">
          <DashboardSidebar
            ASSIGNED_ISSUES={assignedIssuesCount}
            CLOSED_ISSUES={closedIssuesCount}
            OWN_ISSUES={ownIssuesCount}
            ALL_ISSUES={issuesTotalCount || issuesData.length}
            OPEN_PRS={openPrsCount}
            CLOSED_PRS={closedPrsCount}
            MERGED_PRS={mergedPrsCount}
            ALL_PRS={prsTotalCount || prsData.length}
            activeTab={activeTab}
            activeFilter={statusFilter}
            onSelectFilter={handleSelectFilter}
          />

          <div className="section-main">
            <DashboardIssues
              filteredIssuesPrs={activeTab === 'issues' ? filteredIssues : filteredPrs}
              totalCount={
                activeTab === 'issues'
                  ? issuesTotalCount || issuesData.length
                  : prsTotalCount || prsData.length
              }
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              statusFilter={statusFilter}
              setStatusFilter={handleStatusFilterChange}
              activeTabType={activeTab}
              onResetFilters={handleResetFilters}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
