import { FC, useState, useMemo } from 'react';
import {
  FiActivity,
  FiTrendingUp,
  FiClock,
  FiGitPullRequest,
  FiCheckCircle,
  FiZap,
  FiGitMerge,
  FiLayers,
} from 'react-icons/fi';
import styles from './analytics.module.css';

export interface TelemetryItem {
  id?: number;
  title?: string;
  state?: string;
  created_at?: string;
  closed_at?: string | null;
  repository_url?: string;
  html_url?: string;
  pull_request?: {
    merged_at?: string | null;
  };
}

interface DataPoint {
  label: string;
  prsOpened: number;
  prsMerged: number;
  issuesClosed: number;
}

interface VelocityChartProps {
  title?: string;
  subtitle?: string;
  prsData?: TelemetryItem[];
  issuesData?: TelemetryItem[];
  isDemo?: boolean;
}

export const VelocityChart: FC<VelocityChartProps> = ({
  title = 'Real-Time Velocity & Contribution Analytics',
  subtitle = 'Telemetry across repositories, pull request lifecycles, and review turnaround',
  prsData,
  issuesData,
  isDemo = false,
}) => {
  const [timeframe, setTimeframe] = useState<'7d' | '4w' | '3m'>('7d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasRealData = !isDemo && Array.isArray(prsData) && prsData.length > 0;

  // Real data calculations
  const totalOpened = useMemo(() => {
    if (hasRealData && prsData) {
      return prsData.length;
    }
    return 28;
  }, [hasRealData, prsData]);

  const totalMerged = useMemo(() => {
    if (hasRealData && prsData) {
      return prsData.filter((pr) => Boolean(pr.pull_request?.merged_at)).length;
    }
    return 24;
  }, [hasRealData, prsData]);

  const mergeRate = useMemo(() => {
    if (totalOpened === 0) return 0;
    return Math.min(100, Math.round((totalMerged / totalOpened) * 100));
  }, [totalOpened, totalMerged]);

  // Average Turnaround Time calculated from real GitHub merged timestamps
  const { avgTurnaroundText, turnaroundSla } = useMemo(() => {
    if (hasRealData && prsData) {
      const mergedList = prsData.filter(
        (pr) => pr.pull_request?.merged_at && pr.created_at
      );

      if (mergedList.length > 0) {
        let totalHours = 0;
        let under24h = 0;
        let oneToThreeDays = 0;
        let overThreeDays = 0;

        mergedList.forEach((pr) => {
          const created = new Date(pr.created_at!).getTime();
          const merged = new Date(pr.pull_request!.merged_at!).getTime();
          const diffHours = Math.max(0, (merged - created) / (1000 * 60 * 60));

          totalHours += diffHours;
          if (diffHours <= 24) under24h++;
          else if (diffHours <= 72) oneToThreeDays++;
          else overThreeDays++;
        });

        const avgHours = totalHours / mergedList.length;
        const text =
          avgHours < 24
            ? `${avgHours.toFixed(1)}h`
            : `${(avgHours / 24).toFixed(1)}d`;

        const total = mergedList.length;
        const pctUnder24 = Math.round((under24h / total) * 100);
        const pct1to3d = Math.round((oneToThreeDays / total) * 100);
        const pctOver3d = Math.max(0, 100 - pctUnder24 - pct1to3d);

        return {
          avgTurnaroundText: text,
          turnaroundSla: {
            pctUnder24,
            pct1to3d,
            pctOver3d,
            compliance: `${pctUnder24 + pct1to3d}% Fast & Standard`,
          },
        };
      }
    }

    return {
      avgTurnaroundText: '4.2h',
      turnaroundSla: {
        pctUnder24: 64,
        pct1to3d: 30,
        pctOver3d: 6,
        compliance: '94% On Track',
      },
    };
  }, [hasRealData, prsData]);

  // Top repositories computed from real user dataset
  const topRepositories = useMemo(() => {
    if (hasRealData && prsData) {
      const repoCounts: Record<string, number> = {};

      prsData.forEach((pr) => {
        let name = '';
        if (pr.repository_url) {
          name = pr.repository_url.split('/').slice(-1)[0];
        } else if (pr.html_url) {
          const parts = pr.html_url.split('/');
          name = parts[4] || 'repository';
        }
        if (name) {
          repoCounts[name] = (repoCounts[name] || 0) + 1;
        }
      });

      const sorted = Object.entries(repoCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const totalItems = sorted.reduce((sum, [, count]) => sum + count, 0) || 1;

      return sorted.map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / totalItems) * 100),
      }));
    }

    return [
      { name: 'website-backend', count: 42, percent: 52 },
      { name: 'tiny-site-frontend', count: 28, percent: 35 },
      { name: 'website-api-contracts', count: 10, percent: 13 },
    ];
  }, [hasRealData, prsData]);

  // Dynamic Chart Data points grouped by timeframe
  const chartData: DataPoint[] = useMemo(() => {
    if (hasRealData && prsData) {
      const allPrs = prsData;
      const allIssues = issuesData || [];

      // Helper to count items within date range
      const countRange = (start: Date, end: Date) => {
        const opened = allPrs.filter((pr) => {
          if (!pr.created_at) return false;
          const d = new Date(pr.created_at);
          return d >= start && d <= end;
        }).length;

        const merged = allPrs.filter((pr) => {
          if (!pr.pull_request?.merged_at) return false;
          const d = new Date(pr.pull_request.merged_at);
          return d >= start && d <= end;
        }).length;

        const resolved = allIssues.filter((i) => {
          if (i.state !== 'closed') return false;
          const d = new Date(i.closed_at || i.created_at || 0);
          return d >= start && d <= end;
        }).length;

        return { opened, merged, resolved };
      };

      // Determine anchor date from latest PR timestamp
      const timestamps = allPrs
        .map((p) => (p.created_at ? new Date(p.created_at).getTime() : 0))
        .filter((t) => t > 0);
      const latestTime = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();
      const anchorDate = new Date(latestTime);

      if (timeframe === '7d') {
        const days: DataPoint[] = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 6; i >= 0; i--) {
          const start = new Date(anchorDate);
          start.setDate(start.getDate() - i);
          start.setHours(0, 0, 0, 0);

          const end = new Date(start);
          end.setHours(23, 59, 59, 999);

          const { opened, merged, resolved } = countRange(start, end);
          days.push({
            label: dayNames[start.getDay()],
            prsOpened: opened,
            prsMerged: merged,
            issuesClosed: resolved,
          });
        }
        return days;
      }

      if (timeframe === '4w') {
        const weeks: DataPoint[] = [];
        for (let i = 3; i >= 0; i--) {
          const start = new Date(anchorDate);
          start.setDate(start.getDate() - (i + 1) * 7);
          const end = new Date(anchorDate);
          end.setDate(end.getDate() - i * 7);

          const { opened, merged, resolved } = countRange(start, end);
          weeks.push({
            label: `W-${4 - i}`,
            prsOpened: opened,
            prsMerged: merged,
            issuesClosed: resolved,
          });
        }
        return weeks;
      }

      if (timeframe === '3m') {
        const months: DataPoint[] = [];
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        for (let i = 2; i >= 0; i--) {
          const targetMonthDate = new Date(anchorDate);
          targetMonthDate.setMonth(targetMonthDate.getMonth() - i);

          const start = new Date(
            targetMonthDate.getFullYear(),
            targetMonthDate.getMonth(),
            1
          );
          const end = new Date(
            targetMonthDate.getFullYear(),
            targetMonthDate.getMonth() + 1,
            0,
            23,
            59,
            59
          );

          const { opened, merged, resolved } = countRange(start, end);
          months.push({
            label: monthNames[start.getMonth()],
            prsOpened: opened,
            prsMerged: merged,
            issuesClosed: resolved,
          });
        }
        return months;
      }
    }

    // Baseline fallback for demo mode
    if (timeframe === '7d') {
      return [
        { label: 'Mon', prsOpened: 3, prsMerged: 2, issuesClosed: 4 },
        { label: 'Tue', prsOpened: 5, prsMerged: 4, issuesClosed: 6 },
        { label: 'Wed', prsOpened: 4, prsMerged: 4, issuesClosed: 5 },
        { label: 'Thu', prsOpened: 6, prsMerged: 5, issuesClosed: 7 },
        { label: 'Fri', prsOpened: 5, prsMerged: 5, issuesClosed: 6 },
        { label: 'Sat', prsOpened: 3, prsMerged: 2, issuesClosed: 2 },
        { label: 'Sun', prsOpened: 2, prsMerged: 2, issuesClosed: 1 },
      ];
    }
    if (timeframe === '4w') {
      return [
        { label: 'Week 1', prsOpened: 8, prsMerged: 7, issuesClosed: 10 },
        { label: 'Week 2', prsOpened: 12, prsMerged: 11, issuesClosed: 14 },
        { label: 'Week 3', prsOpened: 15, prsMerged: 13, issuesClosed: 16 },
        { label: 'Week 4', prsOpened: 11, prsMerged: 10, issuesClosed: 12 },
      ];
    }
    return [
      { label: 'Month 1', prsOpened: 32, prsMerged: 28, issuesClosed: 35 },
      { label: 'Month 2', prsOpened: 44, prsMerged: 39, issuesClosed: 48 },
      { label: 'Month 3', prsOpened: 51, prsMerged: 46, issuesClosed: 54 },
    ];
  }, [hasRealData, prsData, issuesData, timeframe]);

  const maxVal = useMemo(() => {
    const vals = chartData.flatMap((d) => [d.prsOpened, d.prsMerged, d.issuesClosed]);
    return Math.max(...vals, 1) * 1.3;
  }, [chartData]);

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 200;
  const paddingBottom = 30;
  const paddingTop = 20;
  const usableHeight = svgHeight - paddingBottom - paddingTop;
  const colWidth = svgWidth / chartData.length;

  return (
    <div className={styles.analyticsContainer}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <div className={styles.titleIcon}>
            <FiActivity size={20} />
          </div>
          <div>
            <h3 className={styles.titleText}>
              <span>{title}</span>
              {hasRealData ? (
                <span className={styles.liveBadge}>● Live Data Active</span>
              ) : (
                <span className={styles.demoBadge}>● Sandbox Demo Data</span>
              )}
            </h3>
            <div className={styles.subtitleText}>{subtitle}</div>
          </div>
        </div>

        <div className={styles.controlsRow}>
          <button
            type="button"
            className={`${styles.filterPill} ${timeframe === '7d' ? styles.filterPillActive : ''}`}
            onClick={() => setTimeframe('7d')}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            className={`${styles.filterPill} ${timeframe === '4w' ? styles.filterPillActive : ''}`}
            onClick={() => setTimeframe('4w')}
          >
            Last 4 Weeks
          </button>
          <button
            type="button"
            className={`${styles.filterPill} ${timeframe === '3m' ? styles.filterPillActive : ''}`}
            onClick={() => setTimeframe('3m')}
          >
            Last Quarter
          </button>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.miniStatCard}>
          <div className={styles.miniStatLabel}>
            <span>PRs Opened</span>
            <FiGitPullRequest color="#38bdf8" />
          </div>
          <div className={styles.miniStatValue} style={{ color: '#38bdf8' }}>
            {totalOpened}
          </div>
          <div className={`${styles.miniStatTrend} ${styles.trendPositive}`}>
            <FiTrendingUp /> {hasRealData ? 'Total Indexed' : '+18% vs prev'}
          </div>
        </div>

        <div className={styles.miniStatCard}>
          <div className={styles.miniStatLabel}>
            <span>PRs Merged</span>
            <FiGitMerge color="#a855f7" />
          </div>
          <div className={styles.miniStatValue} style={{ color: '#a855f7' }}>
            {totalMerged}
          </div>
          <div className={`${styles.miniStatTrend} ${styles.trendPositive}`}>
            <FiTrendingUp /> {hasRealData ? 'Production Deployed' : '+24% throughput'}
          </div>
        </div>

        <div className={styles.miniStatCard}>
          <div className={styles.miniStatLabel}>
            <span>Merge Success</span>
            <FiZap color="#10b981" />
          </div>
          <div className={styles.miniStatValue} style={{ color: '#10b981' }}>
            {mergeRate}%
          </div>
          <div className={`${styles.miniStatTrend} ${styles.trendPositive}`}>
            <FiCheckCircle /> SLA Healthy
          </div>
        </div>

        <div className={styles.miniStatCard}>
          <div className={styles.miniStatLabel}>
            <span>Avg Review Turnaround</span>
            <FiClock color="#fbbf24" />
          </div>
          <div className={styles.miniStatValue} style={{ color: '#fbbf24' }}>
            {avgTurnaroundText}
          </div>
          <div className={`${styles.miniStatTrend} ${styles.trendPositive}`}>
            <FiTrendingUp /> Calculated from merged PRs
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Throughput Velocity &amp; Delivery Cadence
          </div>
          <div className={styles.legendRow}>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: '#38bdf8' }} />
              <span>PRs Opened</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: '#a855f7' }} />
              <span>PRs Merged</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: '#10b981' }} />
              <span>Issues Resolved</span>
            </div>
          </div>
        </div>

        <div className={styles.svgWrapper}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            className={styles.svgChart}
          >
            <defs>
              <linearGradient id="blueBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="purpleBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0.25, 0.5, 0.75, 1].map((pct) => {
              const y = svgHeight - paddingBottom - usableHeight * pct;
              return (
                <line
                  key={pct}
                  x1="0"
                  y1={y}
                  x2={svgWidth}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Bars & Trendline */}
            {chartData.map((d, i) => {
              const xBase = i * colWidth;
              const barWidth = Math.min(22, (colWidth - 20) / 2);
              const bar1X = xBase + colWidth / 2 - barWidth - 3;
              const bar2X = xBase + colWidth / 2 + 3;

              const bar1Height = maxVal > 0 ? (d.prsOpened / maxVal) * usableHeight : 0;
              const bar2Height = maxVal > 0 ? (d.prsMerged / maxVal) * usableHeight : 0;

              const bar1Y = svgHeight - paddingBottom - bar1Height;
              const bar2Y = svgHeight - paddingBottom - bar2Height;

              return (
                <g
                  key={d.label}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Hover Column Highlight */}
                  {hoveredIndex === i && (
                    <rect
                      x={xBase + 4}
                      y={paddingTop}
                      width={colWidth - 8}
                      height={usableHeight + 10}
                      fill="rgba(56, 189, 248, 0.06)"
                      rx="6"
                    />
                  )}

                  {/* Opened PR Bar */}
                  <rect
                    x={bar1X}
                    y={bar1Y}
                    width={barWidth}
                    height={Math.max(2, bar1Height)}
                    rx="4"
                    fill="url(#blueBarGrad)"
                  />

                  {/* Merged PR Bar */}
                  <rect
                    x={bar2X}
                    y={bar2Y}
                    width={barWidth}
                    height={Math.max(2, bar2Height)}
                    rx="4"
                    fill="url(#purpleBarGrad)"
                  />

                  {/* Axis Label */}
                  <text
                    x={xBase + colWidth / 2}
                    y={svgHeight - 8}
                    fill={hoveredIndex === i ? '#ffffff' : '#64748b'}
                    fontSize="11"
                    fontWeight={hoveredIndex === i ? '700' : '500'}
                    textAnchor="middle"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}

            {/* Resolved Issues Spline Curve */}
            {(() => {
              const points = chartData.map((d, i) => {
                const x = i * colWidth + colWidth / 2;
                const y =
                  svgHeight - paddingBottom - (maxVal > 0 ? (d.issuesClosed / maxVal) * usableHeight : 0);
                return { x, y };
              });

              const pathD = points.reduce((acc, p, idx) => {
                if (idx === 0) return `M ${p.x} ${p.y}`;
                const prev = points[idx - 1];
                const cx1 = prev.x + (p.x - prev.x) / 2;
                const cy1 = prev.y;
                const cx2 = prev.x + (p.x - prev.x) / 2;
                const cy2 = p.y;
                return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
              }, '');

              return (
                <g>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {points.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredIndex === idx ? 6 : 3.5}
                      fill="#10b981"
                      stroke="#08090c"
                      strokeWidth="2"
                    />
                  ))}
                </g>
              );
            })()}
          </svg>

          {/* Interactive Tooltip */}
          {hoveredIndex !== null && chartData[hoveredIndex] && (
            <div
              className={styles.tooltip}
              style={{
                left: `${((hoveredIndex * colWidth + colWidth / 2) / svgWidth) * 100}%`,
                top: '40%',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                {chartData[hoveredIndex].label}
              </div>
              <div style={{ color: '#38bdf8' }}>
                PRs Opened: <strong>{chartData[hoveredIndex].prsOpened}</strong>
              </div>
              <div style={{ color: '#c084fc' }}>
                PRs Merged: <strong>{chartData[hoveredIndex].prsMerged}</strong>
              </div>
              <div style={{ color: '#10b981' }}>
                Issues Resolved: <strong>{chartData[hoveredIndex].issuesClosed}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Breakdown Metrics: Real Repository Activity + Real Turnaround SLA */}
      <div className={styles.bottomMetricsGrid}>
        {/* Real Top Repositories */}
        <div className={styles.metricSubCard}>
          <div className={styles.subCardTitle}>
            <span>
              <FiLayers style={{ marginRight: '0.35rem' }} />
              Top Repository Contributions
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {hasRealData ? 'Live GitHub' : 'Sample'}
            </span>
          </div>

          {topRepositories.map((repo, idx) => {
            const colors = ['#10b981', '#38bdf8', '#c084fc'];
            const color = colors[idx % colors.length];
            return (
              <div
                className={styles.progressItem}
                key={repo.name}
                style={idx === topRepositories.length - 1 ? { marginBottom: 0 } : undefined}
              >
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>{repo.name}</span>
                  <span className={styles.progressCount}>
                    {repo.percent}% ({repo.count} PRs)
                  </span>
                </div>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${repo.percent}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Turnaround SLA Compliance */}
        <div className={styles.metricSubCard}>
          <div className={styles.subCardTitle}>
            <span>Review SLA Compliance</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
              {turnaroundSla.compliance}
            </span>
          </div>

          <div className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Under 24 Hours (Fast Review)</span>
              <span className={styles.progressCount}>{turnaroundSla.pctUnder24}%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${turnaroundSla.pctUnder24}%`, background: '#10b981' }}
              />
            </div>
          </div>

          <div className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>1 to 3 Days (Standard)</span>
              <span className={styles.progressCount}>{turnaroundSla.pct1to3d}%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${turnaroundSla.pct1to3d}%`, background: '#38bdf8' }}
              />
            </div>
          </div>

          <div className={styles.progressItem} style={{ marginBottom: 0 }}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Over 3 Days (Extended SLA)</span>
              <span className={styles.progressCount}>{turnaroundSla.pctOver3d}%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${turnaroundSla.pctOver3d}%`, background: '#f59e0b' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelocityChart;
