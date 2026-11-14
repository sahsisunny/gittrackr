import React, { FC, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiGitPullRequest,
  FiUser,
  FiActivity,
  FiLayers,
  FiShield,
  FiCpu,
  FiExternalLink,
  FiCheckCircle,
} from 'react-icons/fi';

import DashboardIssues from '@/components/Dashboards/DashboardIssues';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import VelocityChart from '@/components/Analytics/VelocityChart';

import {
  DEMO_USER,
  DEMO_ISSUES,
  DEMO_PRS,
  DEMO_ORGS,
} from '@/mocks/demoData';
import { LANGUAGE_COLORS } from '@/constants/constants';

import styles from './features.module.css';

type DemoTabId = 'dashboard' | 'profile' | 'velocity';

const Features: FC = () => {
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTabId>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<'issues' | 'pullrequests'>('pullrequests');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dashboard filtering for interactive demo
  const currentDemoItems = activeSubTab === 'pullrequests' ? DEMO_PRS : DEMO_ISSUES;

  const filteredDemoItems = useMemo(() => {
    return currentDemoItems.filter((item) => {
      // Status filter
      if (statusFilter === 'open' && item.state !== 'open') return false;
      if (statusFilter === 'closed' && item.state !== 'closed') return false;
      if (statusFilter === 'merged' && !item.pull_request?.merged_at) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(q);
        const repoMatch = item.repository_url?.toLowerCase().includes(q);
        if (!titleMatch && !repoMatch) return false;
      }

      return true;
    });
  }, [currentDemoItems, statusFilter, searchQuery]);

  return (
    <section className={styles.features} id="features" aria-label="GitTrackr Capabilities">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <FiActivity aria-hidden="true" />
          <span>Core Capabilities</span>
        </div>
        <h2 className={styles.sectionHeading}>
          Everything You Need to <span>Command GitHub</span>
        </h2>
        <p className={styles.sectionSubheading}>
          A clean, focused developer cockpit engineered to solve the friction of tracking PR lifecycles, review SLAs, and repository activity.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className={styles.cardsGrid}>
        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiGitPullRequest aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Unified PR &amp; Issue Streams</h3>
          <p className={styles.cardDesc}>
            Real-time multi-repo filtering across authors, assignees, and review statuses. Never lose track of pending reviews.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiLayers aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Multi-Tenant Org Switching</h3>
          <p className={styles.cardDesc}>
            Switch effortlessly between client workspaces, open source orgs, and personal repositories in a single click.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiCpu aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Velocity &amp; Activity Telemetry</h3>
          <p className={styles.cardDesc}>
            Automated language breakdown, repository activity distributions, and contribution streak visualizations.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiShield aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Zero-Config &amp; Privacy First</h3>
          <p className={styles.cardDesc}>
            No external database required. Directly communicates with GitHub&apos;s REST API using scoped read-only tokens.
          </p>
        </div>
      </div>

      {/* Real Interactive Demo Cockpit Showcase */}
      <div className={styles.demoShowcaseWrapper} aria-label="Interactive Demo Window">
        {/* Top Window Bar */}
        <div className={styles.demoWindowBar}>
          <div className={styles.windowControls}>
            <span className={`${styles.windowDot} ${styles.dotRed}`} />
            <span className={`${styles.windowDot} ${styles.dotYellow}`} />
            <span className={`${styles.windowDot} ${styles.dotGreen}`} />
            <span className={styles.windowUrl}>
              gittrackr.sunnysahsi.com/demo/{activeDemoTab}
            </span>
          </div>

          {/* Tab Switcher */}
          <div className={styles.demoTabsRow} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeDemoTab === 'dashboard'}
              className={`${styles.demoTabBtn} ${
                activeDemoTab === 'dashboard' ? styles.demoTabActive : ''
              }`}
              onClick={() => setActiveDemoTab('dashboard')}
            >
              <FiGitPullRequest aria-hidden="true" />
              <span>PRs &amp; Issues Dashboard</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeDemoTab === 'profile'}
              className={`${styles.demoTabBtn} ${
                activeDemoTab === 'profile' ? styles.demoTabActive : ''
              }`}
              onClick={() => setActiveDemoTab('profile')}
            >
              <FiUser aria-hidden="true" />
              <span>Developer Profile &amp; Streaks</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeDemoTab === 'velocity'}
              className={`${styles.demoTabBtn} ${
                activeDemoTab === 'velocity' ? styles.demoTabActive : ''
              }`}
              onClick={() => setActiveDemoTab('velocity')}
            >
              <FiActivity aria-hidden="true" />
              <span>Velocity Telemetry</span>
            </button>
          </div>

          <Link
            href="/dashboard/octocat"
            className={styles.openFullDemoLink}
            title="Open full interactive demo page"
          >
            <span>Full Demo</span>
            <FiExternalLink size={13} aria-hidden="true" />
          </Link>
        </div>

        {/* Demo Content Frame */}
        <div className={styles.demoContentArea}>
          {activeDemoTab === 'dashboard' && (
            <div className={styles.demoInner}>
              {/* Quick Tab Switcher: PRs vs Issues */}
              <div className={styles.demoSubHeader}>
                <div className={styles.demoPillGroup}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('pullrequests');
                      setStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className={`${styles.demoSubTab} ${
                      activeSubTab === 'pullrequests' ? styles.demoSubTabActive : ''
                    }`}
                  >
                    <FiGitPullRequest size={14} />
                    <span>Pull Requests ({DEMO_PRS.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('issues');
                      setStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className={`${styles.demoSubTab} ${
                      activeSubTab === 'issues' ? styles.demoSubTabActive : ''
                    }`}
                  >
                    <FiCheckCircle size={14} />
                    <span>Assigned Issues ({DEMO_ISSUES.length})</span>
                  </button>
                </div>

                <div className={styles.demoLiveBadge}>
                  <span className={styles.livePulseDot} />
                  <span>Interactive Live Demo</span>
                </div>
              </div>

              {/* Render Real Dashboard Issues / PRs Component */}
              <DashboardIssues
                filteredIssuesPrs={filteredDemoItems as any}
                totalCount={currentDemoItems.length}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                activeTabType={activeSubTab}
                onResetFilters={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              />
            </div>
          )}

          {activeDemoTab === 'profile' && (
            <div className={styles.demoInner}>
              <ProfileHeader
                NAME={DEMO_USER.name}
                USERNAME={DEMO_USER.login}
                COMPANY={DEMO_USER.company}
                AVATAR_URL={DEMO_USER.image}
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(260px, 300px) 1fr',
                  gap: '1.5rem',
                  marginTop: '1.5rem',
                }}
              >
                <ProfileSidebar
                  USERNAME={DEMO_USER.login}
                  NAME={DEMO_USER.name}
                  BIO={DEMO_USER.bio}
                  WEBSITE={DEMO_USER.blog}
                  mostUsedLanguages={['TypeScript', 'JavaScript', 'Python', 'Go', 'HTML']}
                  languageColors={LANGUAGE_COLORS}
                />

                <ProfileGitHubStats
                  JOIN_DATE={DEMO_USER.created_at}
                  USER_FOLLOWERS={DEMO_USER.followers}
                  USER_FOLLOWING={DEMO_USER.following}
                  USER_PUBLIC_REPOS={DEMO_USER.public_repos}
                  orgsData={DEMO_ORGS}
                  username={DEMO_USER.login}
                  isDemo={true}
                />
              </div>
            </div>
          )}

          {activeDemoTab === 'velocity' && (
            <div className={styles.demoInner}>
              <VelocityChart
                title="Sunny Sahsi's Velocity & Activity Telemetry"
                prsData={DEMO_PRS as any}
                issuesData={DEMO_ISSUES as any}
                isDemo={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
