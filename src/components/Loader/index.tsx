import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './loader.module.css';

// 1. Top Route Navigation Progress Bar
export const RouteProgressBar: FC = () => {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleStart = () => {
      timer = setTimeout(() => setNavigating(true), 80);
    };

    const handleDone = () => {
      clearTimeout(timer);
      setNavigating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router.events]);

  if (!navigating) return null;

  return <div className={styles.routeProgressBar} aria-hidden="true" />;
};

// 2. Spinner
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  color?: string;
}

export const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  label,
  className = '',
  color,
}) => {
  const sizeClass =
    size === 'sm'
      ? styles.spinnerSm
      : size === 'lg'
      ? styles.spinnerLg
      : styles.spinnerMd;

  return (
    <div className={`${styles.spinnerWrapper} ${className}`} role="status">
      <div
        className={`${styles.spinnerRing} ${sizeClass}`}
        style={color ? { borderTopColor: color } : undefined}
      />
      {label && <span className={styles.spinnerLabel}>{label}</span>}
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Loading
      </span>
    </div>
  );
};

// 3. List Skeleton for Issues & PRs
export interface ListSkeletonProps {
  count?: number;
}

export const ListSkeleton: FC<ListSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className={styles.skeletonList} aria-busy="true" aria-label="Loading list items">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.skeletonItem}>
          <div className={styles.skeletonItemLeft}>
            <div className={`${styles.shimmerBase} ${styles.skeletonBadge}`} />
            <div
              className={`${styles.shimmerBase} ${styles.skeletonTitle}`}
              style={{ width: `${Math.max(45, (idx * 17) % 60 + 40)}%` }}
            />
          </div>

          <div className={styles.skeletonItemRight}>
            <div className={`${styles.shimmerBase} ${styles.skeletonPill}`} />
            <div className={`${styles.shimmerBase} ${styles.skeletonDate}`} />
            <div className={`${styles.shimmerBase} ${styles.skeletonButton}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Repository Skeleton
export interface RepoSkeletonProps {
  count?: number;
}

export const RepoSkeleton: FC<RepoSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className={styles.skeletonRepoGrid} aria-busy="true" aria-label="Loading repositories">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.skeletonRepoCard}>
          <div className={styles.skeletonRepoDetails}>
            <div className={styles.skeletonRepoHeader}>
              <div className={styles.shimmerBase} style={{ width: 30, height: 20 }} />
              <div
                className={styles.shimmerBase}
                style={{ width: `${140 + ((idx * 33) % 90)}px`, height: 20 }}
              />
            </div>
            <div className={styles.skeletonRepoMeta}>
              <div className={styles.shimmerBase} style={{ width: 85, height: 18 }} />
              <div className={styles.shimmerBase} style={{ width: 60, height: 18 }} />
              <div className={styles.shimmerBase} style={{ width: 100, height: 16 }} />
            </div>
          </div>
          <div className={styles.shimmerBase} style={{ width: 72, height: 32, borderRadius: 6 }} />
        </div>
      ))}
    </div>
  );
};

// 5. Full Page Loader
export interface FullPageLoaderProps {
  message?: string;
}

export const FullPageLoader: FC<FullPageLoaderProps> = ({
  message = 'Loading your developer cockpit...',
}) => {
  return (
    <div className={styles.fullPageLoader}>
      <Spinner size="lg" />
      <div className={styles.fullPageMessage}>{message}</div>
    </div>
  );
};

export default Spinner;

