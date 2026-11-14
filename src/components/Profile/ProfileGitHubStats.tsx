import React, { useMemo, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiCalendar,
  FiUsers,
  FiUserCheck,
  FiFolder,
  FiGrid,
  FiBarChart2,
  FiZap,
  FiAward,
  FiCheckCircle,
  FiActivity,
} from 'react-icons/fi';
import styles from './ProfileGitHubStats.module.css';

type User = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

type ProfileGitHubStatsProps = {
  JOIN_DATE: string;
  USER_FOLLOWERS: number;
  USER_FOLLOWING: number;
  USER_PUBLIC_REPOS: number;
  orgsData?: User[];
  usersData?: User[];
  isUser?: boolean;
  username?: string;
  onSelectTab?: (tab: string) => void;
  isDemo?: boolean;
};

type HeatmapDay = {
  dateStr: string;
  count: number;
  level: number; // 0 to 4
};

const ProfileGitHubStats: React.FC<ProfileGitHubStatsProps> = ({
  JOIN_DATE,
  USER_FOLLOWERS,
  USER_FOLLOWING,
  USER_PUBLIC_REPOS,
  orgsData = [],
  usersData = [],
  isUser = true,
  username = '',
  onSelectTab,
  isDemo = false,
}) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const scrollToCalendar = () => {
    const el = document.getElementById('developer-activity-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add(styles.calendarPulse);
      setTimeout(() => el.classList.remove(styles.calendarPulse), 1200);
    }
  };

  const getRelativeDate = (d: string) => {
    if (!d) return 'Recently';
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return moment(date).fromNow();
  };

  const hasOrgs = orgsData && orgsData.length > 0;
  const hasMembers = usersData && usersData.length > 0;

  // Streak metrics calculations (dynamic / derived)
  const streakStats = useMemo(() => {
    // Generate realistic dynamic metrics anchored to real follower/repo counts
    const repoBonus = Math.min((USER_PUBLIC_REPOS || 1) * 3, 40);
    const currentStreak = Math.min(14 + (USER_FOLLOWERS % 7), 35);
    const longestStreak = Math.max(currentStreak + 18, 48 + repoBonus);
    const totalContributions = 1200 + ((USER_PUBLIC_REPOS || 10) * 12) + (USER_FOLLOWERS * 4);
    const consistencyRate = Math.min(88 + ((USER_PUBLIC_REPOS % 8)), 98);

    return {
      currentStreak,
      longestStreak,
      totalContributions,
      consistencyRate,
    };
  }, [USER_PUBLIC_REPOS, USER_FOLLOWERS]);

  // Generate 24 weeks of contribution data (7 days per week)
  const { weeksData, totalPeriodContributions } = useMemo(() => {
    const weeks: HeatmapDay[][] = [];
    const seed = (username || 'developer').split('').reduce((acc, c) => acc + c.charCodeAt(0), 42);
    let total = 0;
    const now = moment();

    // 24 weeks * 7 days
    for (let w = 23; w >= 0; w--) {
      const daysInWeek: HeatmapDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dayMoment = now.clone().subtract(w * 7 + (6 - d), 'days');
        const dayOfWeek = dayMoment.isoWeekday(); // 1 = Mon, 7 = Sun
        const dayOfYear = dayMoment.dayOfYear();

        // Pseudo-random deterministic activity based on seed & day
        const pseudoRand = Math.sin(seed + dayOfYear * 13.37) * 10000;
        const randVal = Math.abs(pseudoRand - Math.floor(pseudoRand));

        let count = 0;
        let level = 0;

        // Weekdays have higher probability of activity
        const isWeekend = dayOfWeek >= 6;
        const threshold = isWeekend ? 0.65 : 0.35;

        if (randVal > threshold) {
          if (randVal > 0.90) {
            count = Math.floor(randVal * 12) + 4;
            level = 4;
          } else if (randVal > 0.75) {
            count = Math.floor(randVal * 6) + 3;
            level = 3;
          } else if (randVal > 0.55) {
            count = Math.floor(randVal * 3) + 2;
            level = 2;
          } else {
            count = 1;
            level = 1;
          }
        }

        total += count;
        daysInWeek.push({
          dateStr: dayMoment.format('MMM D, YYYY'),
          count,
          level,
        });
      }
      weeks.push(daysInWeek);
    }

    return { weeksData: weeks, totalPeriodContributions: total };
  }, [username]);

  // Developer achievement badges
  const achievements = useMemo(() => {
    return [
      {
        icon: '🦈',
        title: 'Pull Shark',
        desc: '85+ PRs Merged with high quality',
        highlight: true,
      },
      {
        icon: '⚡',
        title: 'Quick Reviewer',
        desc: 'Sub-4h review turnaround SLA',
        highlight: true,
      },
      {
        icon: '🌐',
        title: 'Open Source Builder',
        desc: 'Real Dev Squad & public repos contributor',
        highlight: false,
      },
      {
        icon: '🤝',
        title: 'Pair Programmer',
        desc: 'Frequent co-author on merged commits',
        highlight: false,
      },
      {
        icon: '🚀',
        title: 'High Velocity',
        desc: 'Top 10% commit cadence in org',
        highlight: false,
      },
      {
        icon: '🎯',
        title: 'Zero Regressions',
        desc: '99.4% CI clean build pass rate',
        highlight: false,
      },
    ];
  }, []);

  return (
    <div className={styles.statsWrapper}>
      {/* 1. Core Profile KPI Cards Grid */}
      <div>
        <h3 className={styles.statsSectionTitle}>
          <FiBarChart2 size={15} color="var(--accent-cyan)" />
          <span>GitHub Contributions &amp; Network</span>
        </h3>
        <div className={styles.kpiStatsGrid} style={{ marginTop: '0.85rem' }}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Joined GitHub</span>
              <FiCalendar color="#38bdf8" size={17} />
            </div>
            <div className={styles.kpiValue} style={{ color: '#38bdf8', fontSize: '1.4rem' }} suppressHydrationWarning>
              {getRelativeDate(JOIN_DATE)}
            </div>
            <div className={styles.kpiSubtext}>Account vintage</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Followers</span>
              <FiUsers color="#c084fc" size={17} />
            </div>
            <div className={styles.kpiValue} style={{ color: '#c084fc' }}>
              {USER_FOLLOWERS ?? 0}
            </div>
            <div className={styles.kpiSubtext}>Developer reach</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Following</span>
              <FiUserCheck color="#10b981" size={17} />
            </div>
            <div className={styles.kpiValue} style={{ color: '#10b981' }}>
              {USER_FOLLOWING ?? 0}
            </div>
            <div className={styles.kpiSubtext}>Network connections</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Public Repos</span>
              <FiFolder color="#fbbf24" size={17} />
            </div>
            <div className={styles.kpiValue} style={{ color: '#fbbf24' }}>
              {USER_PUBLIC_REPOS ?? 0}
            </div>
            <div className={styles.kpiSubtext}>Open source repositories</div>
          </div>
        </div>
      </div>

      {/* 2. Streak & Delivery Cadence (Only in Demo Mode - Authenticated users show only real GitHub telemetry) */}
      {isDemo && (
        <>
          <div>
            <h3 className={styles.statsSectionTitle}>
              <FiZap size={15} color="#f59e0b" />
              <span>Contribution Streak &amp; Velocity Cadence</span>
            </h3>
            <div className={styles.streakCardGrid}>
              <div
                className={styles.streakCard}
                role="button"
                tabIndex={0}
                onClick={scrollToCalendar}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToCalendar()}
                title="Click to view Contribution Calendar"
              >
                <div className={styles.kpiHeader}>
                  <span>Current Streak</span>
                  <span style={{ fontSize: '1.15rem' }}>🔥</span>
                </div>
                <div className={styles.kpiValue} style={{ color: '#f59e0b' }}>
                  {streakStats.currentStreak} Days
                </div>
                <div className={styles.kpiSubtext}>Active daily streak • See heatmap ↓</div>
              </div>

              <div
                className={styles.streakCard}
                role="button"
                tabIndex={0}
                onClick={scrollToCalendar}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToCalendar()}
                title="Click to view Contribution Calendar"
              >
                <div className={styles.kpiHeader}>
                  <span>Longest Streak</span>
                  <span style={{ fontSize: '1.15rem' }}>⚡</span>
                </div>
                <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>
                  {streakStats.longestStreak} Days
                </div>
                <div className={styles.kpiSubtext}>Personal record • See heatmap ↓</div>
              </div>

              <div
                className={styles.streakCard}
                role="button"
                tabIndex={0}
                onClick={scrollToCalendar}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToCalendar()}
                title="Click to view Contribution Calendar"
              >
                <div className={styles.kpiHeader}>
                  <span>Total Contributions</span>
                  <span style={{ fontSize: '1.15rem' }}>🚀</span>
                </div>
                <div className={styles.kpiValue} style={{ color: '#10b981' }}>
                  {streakStats.totalContributions.toLocaleString()}+
                </div>
                <div className={styles.kpiSubtext}>PRs, commits &amp; issues • See heatmap ↓</div>
              </div>

              <div
                className={styles.streakCard}
                role="button"
                tabIndex={0}
                onClick={scrollToCalendar}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToCalendar()}
                title="Click to view Contribution Calendar"
              >
                <div className={styles.kpiHeader}>
                  <span>Consistency Rate</span>
                  <span style={{ fontSize: '1.15rem' }}>🎯</span>
                </div>
                <div className={styles.kpiValue} style={{ color: '#c084fc' }}>
                  {streakStats.consistencyRate}%
                </div>
                <div className={styles.kpiSubtext}>Weekly shipping cadence • See heatmap ↓</div>
              </div>
            </div>
          </div>

          {/* 3. Contribution Calendar Heatmap */}
          <div className={styles.heatmapCard} id="developer-activity-calendar">
            <div className={styles.heatmapHeader}>
              <div className={styles.heatmapTitle}>
                <FiActivity color="#10b981" size={17} />
                <span>Developer Activity Calendar</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    marginLeft: '0.5rem',
                  }}
                >
                  ({totalPeriodContributions} contributions in the last 6 months)
                </span>
              </div>

              <div className={styles.heatmapTooltipBox}>
                <div
                  className={styles.heatmapTooltip}
                  style={{
                    opacity: hoveredDay ? 1 : 0,
                    visibility: hoveredDay ? 'visible' : 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  {hoveredDay ? (
                    <span>
                      <strong>
                        {hoveredDay.count === 0
                          ? 'No contributions'
                          : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
                      </strong>{' '}
                      on {hoveredDay.dateStr}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.heatmapScrollArea}>
              <div
                className={styles.heatmapGrid}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {weeksData.map((week, wIndex) => (
                  <div key={wIndex} className={styles.heatmapCol}>
                    {week.map((day, dIndex) => {
                      const cellClass =
                        day.level === 4
                          ? styles.cell4
                          : day.level === 3
                          ? styles.cell3
                          : day.level === 2
                          ? styles.cell2
                          : day.level === 1
                          ? styles.cell1
                          : styles.cell0;

                      return (
                        <div
                          key={dIndex}
                          className={`${styles.heatmapCell} ${cellClass}`}
                          title={`${day.count} contributions on ${day.dateStr}`}
                          onMouseEnter={() => setHoveredDay(day)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heatmapFooter}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Telemetry: Sample Preview</span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span>24 Weeks Window</span>
              </div>
              <div className={styles.legend}>
                <span style={{ marginRight: '4px' }}>Less</span>
                <span className={`${styles.legendBox} ${styles.cell0}`} />
                <span className={`${styles.legendBox} ${styles.cell1}`} />
                <span className={`${styles.legendBox} ${styles.cell2}`} />
                <span className={`${styles.legendBox} ${styles.cell3}`} />
                <span className={`${styles.legendBox} ${styles.cell4}`} />
                <span style={{ marginLeft: '4px' }}>More</span>
              </div>
            </div>
          </div>

          {/* 4. Developer Achievements & Badges */}
          <div>
            <h3 className={styles.statsSectionTitle}>
              <FiAward size={15} color="#c084fc" />
              <span>Developer Badges &amp; Recognitions</span>
            </h3>
            <div className={styles.achievementsRow}>
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.achievementBadge}
                  style={{
                    borderColor: item.highlight ? 'rgba(56, 189, 248, 0.4)' : undefined,
                    background: item.highlight ? 'rgba(56, 189, 248, 0.05)' : undefined,
                  }}
                >
                  <span className={styles.achievementIcon}>{item.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>{item.title}</span>
                      {item.highlight && <FiCheckCircle size={12} color="var(--accent-cyan)" />}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 5. Organizations / Members Section (Real GitHub Data) */}
      <div>
        <h3 className={styles.statsSectionTitle}>
          <FiGrid size={15} color="var(--accent-cyan)" />
          <span>{hasMembers ? 'Organization Members' : 'Connected Organizations'}</span>
        </h3>

        {(hasOrgs || hasMembers) ? (
          <div className={styles.orgsGrid} style={{ marginTop: '0.85rem' }}>
            {(hasMembers ? usersData : orgsData).map((item) => (
              <Link
                href={hasMembers ? `/profile/${item.login}` : `/dashboard/${item.login}`}
                key={item.id}
                className={styles.orgCard}
                title={`View ${item.login}`}
              >
                <Image
                  src={item.avatar_url}
                  alt={item.login || 'Avatar'}
                  width={36}
                  height={36}
                  className={styles.orgAvatar}
                />
                <span className={styles.orgName}>{item.login}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              marginTop: '0.85rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-medium)',
              background: 'var(--surface-dark)',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            No public organizations associated with this account.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileGitHubStats;
