import React from 'react';
import styles from './DashboardSidebar.module.css';

type IssuesStatsTableProps = {
  title: string;
  stats: {
    name: string;
    value: number;
  }[];
};

const IssuesStatsTable = ({ title, stats }: IssuesStatsTableProps) => (
  <section className={styles.sidebarContainer}>
    <h5 className={styles.sectionSidebarTitle}>{title}</h5>
    <section className={styles.issuesStats}>
      <table className={styles.issuesStatsTable}>
        <tbody>
          {stats.map((stat) => (
            <tr className={styles.issuesStatsTableTr} key={stat.name}>
              <td className={styles.issuesStatsTableTd}>{stat.name}</td>
              <td className={styles.issuesStatsTableTd}>{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </section>
);

type DashboardSidebarProps = {
  ASSIGNED_ISSUES: number;
  CLOSED_ISSUES: number;
  OWN_ISSUES: number;
  ALL_ISSUES: number;
  OPEN_PRS: number;
  CLOSED_PRS: number;
  MERGED_PRS: number;
  ALL_PRS: number;
};

const DashboardSidebar = ({
  ASSIGNED_ISSUES,
  CLOSED_ISSUES,
  OWN_ISSUES,
  ALL_ISSUES,
  OPEN_PRS,
  CLOSED_PRS,
  MERGED_PRS,
  ALL_PRS,
}: DashboardSidebarProps) => (
  <section className={styles.sectionSidebar}>
    <h1 className={styles.sectionSidebarTitleSummary}>Summary</h1>
    <div className={styles.summeryItems}>
      <IssuesStatsTable
        title="Issues"
        stats={[
          {
            name: 'Assigned Issues',
            value: ASSIGNED_ISSUES,
          },
          {
            name: 'Closed Issues',
            value: CLOSED_ISSUES,
          },
          { name: 'Own Issues', value: OWN_ISSUES },
          { name: 'All Issues', value: ALL_ISSUES },
        ]}
      />

      <IssuesStatsTable
        title="Pull Requests"
        stats={[
          { name: 'Open PRs', value: OPEN_PRS },
          { name: 'Closed PRs', value: CLOSED_PRS },
          { name: 'Merged PRs', value: MERGED_PRS },
          { name: 'All PRs', value: ALL_PRS },
        ]}
      />
    </div>
  </section>
);

export default DashboardSidebar;
