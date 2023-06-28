import React from 'react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | GitTrackr</title>
      </Head>
      <Navbar />
      <div className="page-not-found">
        <h1 className="title">404 - Page Not Found</h1>
        <p className="description">
          The page you are looking for does not exist.
        </p>
        {/* back to home page */}

        <Link href="/" className="back-to-home-btn">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
