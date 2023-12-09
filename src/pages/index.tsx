import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import About from '@/components/About';
import Features from '@/components/Features';
import Layout from '@/components/Layout';
import Testimonials from '@/components/Testimonials';

import styles from '@/styles/index.module.css';
import Slider from '@/components/Slider/Slider';
import AboutDeveloper from '@/components/About-Developer';
import ParticlesBg from '@/components/Particles';

const Home: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { dev } = router.query;
  const { frame } = router.query;

  return (
    <Layout title="GitTrackr | Home">
      <ParticlesBg />

      <div className={styles.homeContainer}>
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
                  className={`${styles.heroButton} ${styles.demoBtn} hide`}
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
        {!dev && <Features />}
        {dev && <Slider showFrame={frame === 'true'} />}
        <AboutDeveloper />
        <Testimonials />
      </div>
    </Layout>
  );
};

export default Home;
