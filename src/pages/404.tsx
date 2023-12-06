import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout title="GitTrackr | 404 - Page Not Found">
      <div className="page-not-found">
        <h1 className="title">404 - Page Not Found</h1>
        <p className="description">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="back-to-home-btn">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
