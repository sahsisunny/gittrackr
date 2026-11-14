import { FC, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiExternalLink,
  FiShield,
  FiActivity,
  FiHelpCircle,
  FiCheckCircle,
  FiSend,
  FiLayers,
  FiCompass,
} from 'react-icons/fi';
import Layout from '@/components/Layout';
import { helpQnAMock, helpCategories, HelpTopic } from '@/mocks/helpQnQ.mock';
import styles from '@/styles/help.module.css';

const helpJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: helpQnAMock.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.summary,
    },
  })),
};

const Help: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTopics = useMemo(() => {
    return helpQnAMock.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'All' || topic.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchQuestion = topic.question.toLowerCase().includes(q);
      const matchSummary = topic.summary.toLowerCase().includes(q);
      const matchAnswer = topic.answer.toLowerCase().includes(q);
      const matchSteps = topic.steps?.some((step) =>
        step.toLowerCase().includes(q)
      );

      return matchQuestion || matchSummary || matchAnswer || matchSteps;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Layout
      title="GitTrackr | Documentation, Troubleshooting &amp; Guides"
      description="Step-by-step guides for troubleshooting organization visibility, connecting GitHub accounts, optimizing your triage cockpit, and rate-limit prevention in GitTrackr."
      jsonLd={helpJsonLd}
    >
      <main className={styles.helpContainer}>
        {/* Header */}
        <div className={styles.headerArea}>
          <h1 className={styles.sectionHeading}>
            Help, Documentation &amp;{' '}
            <span className={styles.sectionHeadingGradient}>Guides</span>
          </h1>
          <p className={styles.sectionSubheading}>
            Clear, step-by-step instructions to configure your GitHub
            integrations, resolve visibility blockers, and maximize your triage
            velocity.
          </p>
        </div>

        {/* 3 Quick Action Cards */}
        <section
          className={styles.quickActionsGrid}
          aria-label="Quick Resolution Cards"
        >
          <a
            href="https://github.com/settings/applications"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.quickActionCard}
          >
            <div className={styles.quickActionHeader}>
              <div
                className={styles.quickActionIcon}
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  color: '#38bdf8',
                }}
              >
                <FiLayers />
              </div>
              <FiExternalLink size={14} color="var(--text-muted)" />
            </div>
            <div className={styles.quickActionTitle}>
              Grant Organization Access
            </div>
            <div className={styles.quickActionDesc}>
              Missing an org? Grant or approve third-party OAuth access directly
              in your GitHub settings.
            </div>
          </a>

          <Link href="/dashboard/octocat" className={styles.quickActionCard}>
            <div className={styles.quickActionHeader}>
              <div
                className={styles.quickActionIcon}
                style={{
                  background: 'rgba(192, 132, 252, 0.12)',
                  color: '#c084fc',
                }}
              >
                <FiCompass />
              </div>
              <FiExternalLink size={14} color="var(--text-muted)" />
            </div>
            <div className={styles.quickActionTitle}>
              Interactive Sandbox Demo
            </div>
            <div className={styles.quickActionDesc}>
              Experience live dual-stream issue and PR triage without connecting
              your GitHub credentials.
            </div>
          </Link>

          <Link href="/contact-us" className={styles.quickActionCard}>
            <div className={styles.quickActionHeader}>
              <div
                className={styles.quickActionIcon}
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                }}
              >
                <FiSend />
              </div>
              <FiExternalLink size={14} color="var(--text-muted)" />
            </div>
            <div className={styles.quickActionTitle}>Direct Engineering Support</div>
            <div className={styles.quickActionDesc}>
              Have questions, feedback, or custom requirements? Send a message
              via our Resend contact form.
            </div>
          </Link>
        </section>

        {/* Search and Category Filters */}
        <div className={styles.controlsSection}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search documentation, topics, or error codes (e.g. org visibility, rate limits)..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className={styles.categoryPillsRow} role="tablist">
            {helpCategories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`${styles.categoryPill} ${
                  selectedCategory === category
                    ? styles.categoryPillActive
                    : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Accordion List */}
        <section className={styles.topicsList} aria-label="Help Topics">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <details
                key={topic.id}
                className={styles.topicCard}
                open={index === 0 && !searchQuery ? true : undefined}
              >
                <summary className={styles.topicSummary}>
                  <div className={styles.topicTitleArea}>
                    <div className={styles.topicMetaRow}>
                      <span className={styles.topicCategoryTag}>
                        {topic.category}
                      </span>
                      {topic.badge && (
                        <span className={styles.topicBadge}>{topic.badge}</span>
                      )}
                    </div>
                    <span className={styles.topicQuestion}>
                      {topic.question}
                    </span>
                  </div>
                  <FiChevronDown
                    className={styles.topicToggleIcon}
                    size={20}
                    aria-hidden="true"
                  />
                </summary>

                <div className={styles.topicBody}>
                  {/* Summary */}
                  <div className={styles.topicSummaryBox}>
                    <strong>Summary: </strong>
                    {topic.summary}
                  </div>

                  {/* Step-by-Step Instructions */}
                  {topic.steps && topic.steps.length > 0 && (
                    <div className={styles.stepsContainer}>
                      <div className={styles.stepsTitle}>
                        Step-by-Step Instructions
                      </div>
                      {topic.steps.map((step, sIdx) => (
                        <div key={sIdx} className={styles.stepItem}>
                          <span className={styles.stepNumber}>{sIdx + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pro Tip Callout Box */}
                  {topic.tips && topic.tips.length > 0 && (
                    <div className={styles.proTipBox}>
                      <FiCheckCircle size={18} className={styles.proTipIcon} />
                      <div>
                        <strong>Pro Tip: </strong>
                        {topic.tips.join(' ')}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            ))
          ) : (
            <div className={styles.emptyTopics}>
              <h3>No documentation matching &quot;{searchQuery}&quot;</h3>
              <p>
                Try searching with different keywords, select &quot;All&quot;
                categories, or drop us a line below.
              </p>
            </div>
          )}
        </section>

        {/* Contact Banner */}
        <div className={styles.contactBanner}>
          <div className={styles.contactBannerText}>
            <h3>Need further assistance or found a bug?</h3>
            <p>
              Our engineering team is active and ready to help. Reach out
              directly and we&apos;ll get back to you promptly.
            </p>
          </div>
          <Link href="/contact-us" className={styles.contactButton}>
            <span>Contact Support</span>
            <FiSend size={15} />
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Help;
