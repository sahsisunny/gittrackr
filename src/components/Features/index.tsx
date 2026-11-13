import React, { FC, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  FiGitPullRequest,
  FiUser,
  FiGrid,
  FiLayers,
  FiActivity,
  FiShield,
  FiCpu,
} from 'react-icons/fi';

import OrgDashboardImg from '@/assets/features/org-dashboard.png';
import OrgProfileImg from '@/assets/features/org-profile.png';
import PRsIssuesImg from '@/assets/features/user.png';
import UserProfileImg from '@/assets/features/user-profile.png';

import styles from './features.module.css';

interface ShowcaseTab {
  id: string;
  label: string;
  image: StaticImageData;
  icon: React.ReactNode;
}

const showcaseTabs: ShowcaseTab[] = [
  {
    id: 'prs',
    label: 'PRs & Issues Cockpit',
    image: PRsIssuesImg,
    icon: <FiGitPullRequest aria-hidden="true" />,
  },
  {
    id: 'user-profile',
    label: 'Developer Profile & Repos',
    image: UserProfileImg,
    icon: <FiUser aria-hidden="true" />,
  },
  {
    id: 'org-dashboard',
    label: 'Organization Dashboard',
    image: OrgDashboardImg,
    icon: <FiGrid aria-hidden="true" />,
  },
  {
    id: 'org-profile',
    label: 'Org Members & Team Stats',
    image: OrgProfileImg,
    icon: <FiLayers aria-hidden="true" />,
  },
];

const Features: FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('prs');
  const activeTab = showcaseTabs.find((t) => t.id === activeTabId) || showcaseTabs[0];

  return (
    <section className={styles.features} id="features" aria-label="GitTrackr Features">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <FiActivity aria-hidden="true" />
          <span>Core Capabilities</span>
        </div>
        <h2 className={styles.sectionHeading}>
          Everything You Need to <span>Command GitHub</span>
        </h2>
        <p className={styles.sectionSubheading}>
          Engineered for engineering leaders, open-source maintainers, and individual contributors
          who need instant clarity without the GitHub noise.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className={styles.cardsGrid}>
        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiGitPullRequest aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Unified PR & Issue Triage</h3>
          <p className={styles.cardDesc}>
            Real-time multi-repo filtering across authors, assignees, and review statuses. Never lose track of pending reviews.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiLayers aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Multi-Tenant Organization Switcher</h3>
          <p className={styles.cardDesc}>
            Switch effortlessly between client workspaces, open source orgs, and personal repositories in a single click.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiCpu aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Language & Velocity Analytics</h3>
          <p className={styles.cardDesc}>
            Automated language breakdown, repository activity distributions, and commit cadence visualizations.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.cardIconBox}>
            <FiShield aria-hidden="true" />
          </div>
          <h3 className={styles.cardTitle}>Zero-Config & Privacy First</h3>
          <p className={styles.cardDesc}>
            No databases to host, no code scraped. Uses your GitHub token directly with read-only scoped permissions.
          </p>
        </div>
      </div>

      {/* Interactive Screenshot Showcase */}
      <div className={styles.showcaseContainer}>
        <div className={styles.tabsContainer} role="tablist">
          {showcaseTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTabId === tab.id}
              className={`${styles.tabBtn} ${activeTabId === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.imageFrame} role="tabpanel">
          <Image
            key={activeTab.id}
            src={activeTab.image}
            alt={activeTab.label}
            className={styles.featureImage}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
