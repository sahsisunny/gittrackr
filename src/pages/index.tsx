import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  FiGithub,
  FiCompass,
  FiArrowRight,
  FiZap,
} from 'react-icons/fi';

import About from '@/components/About';
import Features from '@/components/Features';
import Layout from '@/components/Layout';
import AboutDeveloper from '@/components/About-Developer';
import ParticlesBg from '@/components/Particles';

import styles from '@/styles/index.module.css';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GitTrackr',
    url: 'https://gittrackr.sunnysahsi.com',
    description:
      'Real-time developer cockpit for tracking GitHub pull requests, issues, repositories, and organizations with velocity metrics.',
    author: {
      '@type': 'Person',
      name: 'Sunny Sahsi',
      url: 'https://sunnysahsi.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GitTrackr',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All (Web-based)',
    url: 'https://gittrackr.sunnysahsi.com',
    description:
      'GitTrackr provides developers with a unified cockpit to track, triage, and manage pull requests, issues, and contributor velocity across GitHub repositories.',
    image: 'https://gittrackr.sunnysahsi.com/og-image.svg',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Multi-repo GitHub pull request and issue triage',
      'Real-time review SLA and cycle velocity metrics',
      'Cross-organization contributor telemetry',
      'Instant interactive demo mode without OAuth credentials',
      'Accessible dark-first responsive design tokens',
    ],
    creator: {
      '@type': 'Person',
      name: 'Sunny Sahsi',
      url: 'https://sunnysahsi.com',
    },
  },
];

const Home: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as { name?: string | null; login?: string } | undefined;

  return (
    <Layout
      title="GitTrackr | Real-Time GitHub Intelligence &amp; Workflow Cockpit"
      description="Track, triage, and manage GitHub Pull Requests, Issues, and Organizations with real-time velocity metrics. Built for high-velocity software engineering squads."
      jsonLd={homeJsonLd}
    >
      <ParticlesBg />

      <main className={styles.homeContainer}>
        {/* Clean, Focused Hero Section */}
        <section className={styles.hero} id="home">
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroBadge}>
            <FiZap aria-hidden="true" />
            <span>GitTrackr 2.0 • Real-Time GitHub Developer Cockpit</span>
          </div>

          <h1 className={styles.heroTitle}>
            {!session ? (
              <>
                Supercharge Your GitHub Workflow with{' '}
                <span className={styles.heroTitleHighlight}>GitTrackr</span>
              </>
            ) : (
              <>
                Welcome back,{' '}
                <span className={styles.heroTitleHighlight}>
                  {user?.name ? user.name.split(' ')[0] : user?.login}
                </span>
              </>
            )}
          </h1>

          <p className={styles.heroSubtitle}>
            Track, triage, and manage Pull Requests, Issues, Repositories, and
            Organizations across all your teams with instant live filtering and
            unified velocity metrics.
          </p>

          <div className={styles.heroButtonContainer}>
            {!session ? (
              <>
                <Link href="/login" className={styles.primaryButton}>
                  <FiGithub size={18} aria-hidden="true" />
                  <span>Connect with GitHub</span>
                </Link>
                <Link href="/dashboard/octocat" className={styles.secondaryButton}>
                  <FiCompass size={18} aria-hidden="true" />
                  <span>Explore Live Demo</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/dashboard/${user?.login}`}
                  className={styles.primaryButton}
                >
                  <FiZap size={18} aria-hidden="true" />
                  <span>Go to Dashboard</span>
                </Link>
                <Link href="/profile" className={styles.secondaryButton}>
                  <span>View Your Profile</span>
                  <FiArrowRight size={16} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Core Capabilities & Unified Interactive Demo Showcase */}
        <Features />

        {/* Why GitTrackr Value Pillars */}
        <About />

        {/* Developer Spotlight */}
        <AboutDeveloper />
      </main>
    </Layout>
  );
};

export default Home;
