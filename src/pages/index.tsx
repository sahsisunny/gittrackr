import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import About from '@/components/About';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import styles from '@/styles/index.module.css';

import Testimonials from '@/components/Testimonials';

const Home: FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>GitTrackr</title>
      </Head>
      <Navbar />
      <div className={styles.Homecontainer}>
        <div className={styles.hero} id="home">
          <h1 className={styles.heroTitle}>
            {!session ? (
              <>
                Track, Manage, and Collaborate with
                <span className={styles.heroTitleHighlight}>
                  &nbsp;GitTrackr
                </span>
              </>
            ) : (
              <>
                Welcome to GitTrackr
                {session.user?.name && (
                  <span className={styles.heroTitleHighlight}>
                    &nbsp;{session.user.name.split(' ')[0]}
                  </span>
                )}
              </>
            )}
          </h1>
          <p className={styles.heroSubtitle}>
            Supercharge your GitHub workflow. Sign in, track and manage PRs,
            issues, repos, and orgs with ease.
          </p>
          <div className={styles.heroButtonContainer}>
            {!session ? (
              <>
                <Link href="/login" className={styles.heroButton}>
                  Sign in
                </Link>
                <Link
                  href="#"
                  className={`${styles.heroButton} ${styles.demoBtn}`}
                >
                  Demo
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                className={`${styles.heroButton} ${styles.demoBtn}`}
              >
                See Profile
              </Link>
            )}
          </div>
        </div>
        <About />
        <Features />
        <Testimonials />
      </div>

      <Footer />
    </>
  );
};

export default Home;
