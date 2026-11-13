import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  FiGithub,
  FiCompass,
  FiGitPullRequest,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiArrowRight,
  FiZap,
} from 'react-icons/fi';

import About from '@/components/About';
import Features from '@/components/Features';
import Layout from '@/components/Layout';
import AboutDeveloper from '@/components/About-Developer';
import ParticlesBg from '@/components/Particles';
import VelocityChart from '@/components/Analytics/VelocityChart';

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
  const [activePreviewTab, setActivePreviewTab] = useState<'prs' | 'issues'>('prs');
  const user = session?.user as { name?: string | null; login?: string } | undefined;

  return (
    <Layout
      title="GitTrackr | Real-Time GitHub Intelligence & Workflow Cockpit"
      description="Track, triage, and manage GitHub Pull Requests, Issues, and Organizations with real-time velocity metrics. Built for high-velocity software engineering squads."
      jsonLd={homeJsonLd}
    >
      <ParticlesBg />

      <main className={styles.homeContainer}>
        {/* Hero Section */}
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

          {/* Interactive Live Preview Window */}
          <div className={styles.heroPreviewWindow} aria-label="GitTrackr Interface Preview">
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.windowTitle}>
                <span>gittrackr.dev — developer-cockpit/octocat</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('prs')}
                  className="nav-link"
                  style={{
                    fontSize: '0.775rem',
                    padding: '0.2rem 0.6rem',
                    background: activePreviewTab === 'prs' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activePreviewTab === 'prs' ? '#38bdf8' : '#94a3b8',
                    border: '1px solid ' + (activePreviewTab === 'prs' ? 'rgba(56, 189, 248, 0.3)' : 'transparent'),
                  }}
                >
                  Pull Requests (18)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('issues')}
                  className="nav-link"
                  style={{
                    fontSize: '0.775rem',
                    padding: '0.2rem 0.6rem',
                    background: activePreviewTab === 'issues' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activePreviewTab === 'issues' ? '#38bdf8' : '#94a3b8',
                    border: '1px solid ' + (activePreviewTab === 'issues' ? 'rgba(56, 189, 248, 0.3)' : 'transparent'),
                  }}
                >
                  Assigned Issues (12)
                </button>
              </div>
            </div>

            <div className={styles.windowBody}>
              <div className={styles.previewStatsRow}>
                <div className={styles.previewStatCard}>
                  <div className={styles.previewStatLabel}>Open Pull Requests</div>
                  <div className={styles.previewStatNumber} style={{ color: '#38bdf8' }}>7 Active</div>
                </div>
                <div className={styles.previewStatCard}>
                  <div className={styles.previewStatLabel}>Merged This Week</div>
                  <div className={styles.previewStatNumber} style={{ color: '#c084fc' }}>11 Merged</div>
                </div>
                <div className={styles.previewStatCard}>
                  <div className={styles.previewStatLabel}>Pending Review</div>
                  <div className={styles.previewStatNumber} style={{ color: '#10b981' }}>2 Ready</div>
                </div>
              </div>

              <div className={styles.previewItemsList}>
                {activePreviewTab === 'prs' ? (
                  <>
                    <div className={styles.previewItemRow}>
                      <div className={styles.previewItemLeft}>
                        <span className="status-badge open">
                          <FiGitPullRequest aria-hidden="true" /> Open
                        </span>
                        <span className={styles.previewItemTitle}>
                          feat(dashboard): add live real-time metrics telemetry and filters
                        </span>
                        <span className={styles.previewItemRepo}>octocat/gittrackr</span>
                      </div>
                      <div className={styles.previewItemRight}>
                        <FiClock aria-hidden="true" />
                        <span>2h ago</span>
                      </div>
                    </div>

                    <div className={styles.previewItemRow}>
                      <div className={styles.previewItemLeft}>
                        <span className="status-badge merged">
                          <FiCheckCircle aria-hidden="true" /> Merged
                        </span>
                        <span className={styles.previewItemTitle}>
                          fix(auth): improve session token refresh reliability and error handling
                        </span>
                        <span className={styles.previewItemRepo}>octocat/gittrackr</span>
                      </div>
                      <div className={styles.previewItemRight}>
                        <FiClock aria-hidden="true" />
                        <span>1d ago</span>
                      </div>
                    </div>

                    <div className={styles.previewItemRow}>
                      <div className={styles.previewItemLeft}>
                        <span className="status-badge merged">
                          <FiCheckCircle aria-hidden="true" /> Merged
                        </span>
                        <span className={styles.previewItemTitle}>
                          refactor(ui): adopt modern CSS tokens, dark palette, and glassmorphism
                        </span>
                        <span className={styles.previewItemRepo}>octocat/ui-primitives</span>
                      </div>
                      <div className={styles.previewItemRight}>
                        <FiClock aria-hidden="true" />
                        <span>3d ago</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.previewItemRow}>
                      <div className={styles.previewItemLeft}>
                        <span className="status-badge open">
                          <FiAlertCircle aria-hidden="true" /> Open
                        </span>
                        <span className={styles.previewItemTitle}>
                          Support multi-state filtering (Open, Merged, Closed) with quick badge toggles
                        </span>
                        <span className={styles.previewItemRepo}>octocat/gittrackr</span>
                      </div>
                      <div className={styles.previewItemRight}>
                        <FiClock aria-hidden="true" />
                        <span>5h ago</span>
                      </div>
                    </div>

                    <div className={styles.previewItemRow}>
                      <div className={styles.previewItemLeft}>
                        <span className="status-badge closed">
                          <FiCheckCircle aria-hidden="true" /> Closed
                        </span>
                        <span className={styles.previewItemTitle}>
                          Optimize avatar caching on high-frequency organization changes
                        </span>
                        <span className={styles.previewItemRepo}>octocat/gittrackr</span>
                      </div>
                      <div className={styles.previewItemRight}>
                        <FiClock aria-hidden="true" />
                        <span>2d ago</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Live Velocity & Telemetry Graph Section */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 1.5rem',
            width: '100%',
          }}
          aria-label="Live Telemetry Graph"
        >
          <VelocityChart
            title="Squad Telemetry & Delivery Velocity"
            subtitle="Measure pull request cycle times, review latency, and cross-repo output in real time"
            isDemo={true}
          />
        </section>

        {/* About Section */}
        <About />

        {/* About Developer Section */}
        <AboutDeveloper />
      </main>
    </Layout>
  );
};

export default Home;
