import React from 'react';
import Link from 'next/link';
import { FiHome, FiCompass } from 'react-icons/fi';
import Layout from '@/components/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout
      title="GitTrackr | 404 - Page Not Found"
      description="The requested page could not be found."
      noindex={true}
    >
      <main className="page-not-found">
        <div className="not-found-code">404</div>
        <h1 className="title" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Repository or Page Not Found
        </h1>
        <p className="description" style={{ color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.6 }}>
          The requested route, user profile, or organization does not exist or requires authentication.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="back-to-home-btn">
            <FiHome aria-hidden="true" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/dashboard/octocat"
            className="back-to-home-btn"
            style={{
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
            }}
          >
            <FiCompass aria-hidden="true" />
            <span>Try Live Demo</span>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default NotFound;
