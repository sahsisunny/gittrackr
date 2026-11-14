export interface HelpTopic {
  id: number;
  category: 'Getting Started' | 'Organizations' | 'Features & Cockpit' | 'Security & Limits' | 'Troubleshooting';
  question: string;
  summary: string;
  badge?: string;
  steps?: string[];
  tips?: string[];
  answer: string;
}

export const helpCategories = [
  'All',
  'Getting Started',
  'Organizations',
  'Features & Cockpit',
  'Security & Limits',
  'Troubleshooting',
] as const;

export const helpQnAMock: HelpTopic[] = [
  {
    id: 1,
    category: 'Organizations',
    question: 'Why are my GitHub organizations not appearing in the workspace menu?',
    summary: 'Organization access restrictions or private membership visibility on GitHub may prevent organizations from syncing.',
    badge: 'Most Common',
    steps: [
      'Navigate to GitHub Settings -> Applications -> Authorized OAuth Apps (or visit https://github.com/settings/applications).',
      'Select "GitTrackr" from the list of authorized applications.',
      'Under "Organization access", find your organization and click "Grant" or "Request access". If an organization enforces SAML SSO, complete the SSO authorization step.',
      'Alternatively, visit your organization page on GitHub (https://github.com/orgs/<your-org>/people), locate your username, and change your membership visibility from "Private" to "Public".',
      'Return to GitTrackr and refresh the dashboard. Your organizations will immediately populate in the dropdown workspace switcher.',
    ],
    tips: [
      'If your organization has 0 public repositories or restricted internal access, GitTrackr gracefully defaults to 0 items to prevent GitHub 422 API errors.',
      'You can switch between personal repositories and organizational dashboards at any time from the avatar menu.',
    ],
    answer:
      'Organizations may not appear if third-party application access is restricted by your organization administrator, or if your membership visibility is set to Private.\n\nTo resolve this:\n1. Go to GitHub Settings > Applications > Authorized OAuth Apps and ensure GitTrackr has access granted for your organization.\n2. On your organization People page, toggle your membership visibility to Public.\n3. Re-authenticate or refresh your GitTrackr session.',
  },
  {
    id: 2,
    category: 'Getting Started',
    question: 'What is GitTrackr and how does it optimize my engineering workflow?',
    summary: 'A unified developer cockpit consolidating pull requests, assigned issues, review turnaround, and team velocity across all your repositories.',
    badge: 'Overview',
    steps: [
      'Sign In using your GitHub account via scoped OAuth. No database setup or configuration required.',
      'GitTrackr automatically indexes your active pull requests (authored and reviewing) and assigned backlog issues across your personal and organizational repos.',
      'Use the top multi-state KPI cards to filter immediately by Open PRs, Merged PRs, Assigned Issues, or Closed Issues.',
      'Open the Velocity Telemetry graph to monitor your 7-day, 4-week, or quarterly shipping cadence and review SLAs.',
    ],
    tips: [
      'You do not need to keep 15 separate GitHub notification tabs open. GitTrackr provides a single triage pane with zero latency.',
    ],
    answer:
      'GitTrackr is a high-velocity GitHub intelligence cockpit designed for engineers, contributors, and squad leads. Instead of juggling dozens of browser tabs, GitTrackr aggregates all your active work streams into an intuitive, zero-database triage dashboard with real-time velocity metrics.',
  },
  {
    id: 3,
    category: 'Features & Cockpit',
    question: 'How do the clickable KPI cards and multi-state filters work?',
    summary: 'Interactive telemetry filters allowing instant drill-down into open work items, merged contributions, and backlog tasks.',
    steps: [
      'Click on any KPI card at the top of the dashboard ("Open PRs", "Merged PRs", "Assigned Issues", "Closed Issues") to filter the item list instantly.',
      'Clicking an already active KPI card toggles the filter back to "All" items.',
      'Use the search bar to filter by PR/issue title or repository name simultaneously with any active status filter.',
      'Click the "Reset" button in the filter bar at any time to clear all active query tags and restore the default view.',
    ],
    tips: [
      'Filter states automatically sync to the browser URL (e.g. ?tab=pullrequests&filter=open), so you can bookmark or share your exact filtered view.',
    ],
    answer:
      'Every KPI card on the dashboard acts as an interactive toggle filter. Clicking "Open PRs" or "Merged PRs" narrows the list to those specific items, while clicking the active card again resets to all items. Filters combine with real-time search queries and sync directly with the browser URL.',
  },
  {
    id: 4,
    category: 'Security & Limits',
    question: 'How does GitTrackr prevent GitHub API rate limits (403 / 429)?',
    summary: 'Intelligent in-memory caching, request collapsing, and paginated on-demand ingestion safeguard your quota.',
    steps: [
      'All GitHub API responses (organizations, repositories, search queries, and language statistics) are cached in-memory with a 3 to 5-minute TTL.',
      'Switching between tabs, filters, or views serves cached data instantly without firing redundant network requests.',
      'Queries are paginated with on-demand "Load More" controls (20 items at a time), eliminating explosive concurrent background requests.',
      'GitTrackr continuously inspects x-ratelimit-remaining and x-ratelimit-reset response headers to protect your 30 req/min search quota.',
    ],
    tips: [
      'In the rare event that GitHub rate limits are reached, GitTrackr displays a friendly banner indicating when the quota resets instead of crashing.',
    ],
    answer:
      'GitTrackr employs client-side TTL caching, request deduplication, and on-demand pagination. Rather than firing multiple concurrent requests on page load, data is ingested incrementally and cached for 3–5 minutes, ensuring your GitHub quota is preserved.',
  },
  {
    id: 5,
    category: 'Security & Limits',
    question: 'Is my source code or token stored on any server?',
    summary: 'GitTrackr operates on a strict zero-database, privacy-first architecture.',
    badge: 'Security',
    steps: [
      'GitTrackr stores NO user source code, repository contents, or database records on disk.',
      'Your GitHub OAuth token is stored exclusively in an encrypted, HTTP-only session cookie managed by NextAuth.',
      'All GitHub queries execute directly between your client browser and GitHub APIs using scoped bearer tokens.',
      'Signing out completely clears all session cookies and local cache immediately.',
    ],
    tips: [
      'GitTrackr only requests read-level permissions necessary to display your assigned issues, pull requests, and public organization memberships.',
    ],
    answer:
      'No. GitTrackr has zero server database storage. Your OAuth credentials reside only in encrypted, scoped session cookies, and API queries execute directly with GitHub over HTTPS. We never store, inspect, or clone your proprietary source code.',
  },
  {
    id: 6,
    category: 'Features & Cockpit',
    question: 'How is the Contribution Streak and Activity Calendar calculated?',
    summary: 'A layout-stable contribution heatmap paired with active streak telemetry and shipping consistency metrics.',
    steps: [
      'Current Streak: The consecutive number of days with active GitHub contributions (commits, PRs, or issue interactions).',
      'Longest Streak: Your historical personal record for consecutive contribution days.',
      'Total Contributions: Cumulative metric tracking indexed PRs, backlog issues, and commits.',
      'Consistency Rate: The percentage of active sprint weeks with verified shipped contributions.',
    ],
    tips: [
      'Clicking any streak KPI card on your Profile page automatically scrolls smoothly to the Contribution Heatmap with a cyan highlight pulse.',
      'Hovering over calendar cells displays exact date and contribution counts with zero cumulative layout shift (CLS).',
    ],
    answer:
      'The activity calendar displays your daily GitHub contribution frequency across the year. The accompanying streak telemetry computes your current active daily streak, longest historical streak, and weekly shipping consistency rate.',
  },
  {
    id: 7,
    category: 'Troubleshooting',
    question: 'What should I do if a repository or issue returns a 422 error?',
    summary: 'Understanding GitHub 422 Unprocessable Entity responses for empty or restricted targets.',
    steps: [
      'GitHub returns HTTP 422 when a search qualifier (e.g. org:<name>) targets an organization with zero searchable public repositories, or an organization requiring SAML authorization.',
      'GitTrackr automatically detects 422 responses and resolves them gracefully with an empty state rather than freezing the UI.',
      'If you expect issues to be present, verify that your OAuth token has third-party access granted in your organization settings, and that the organization has active repositories.',
    ],
    tips: [
      'Check the browser console; GitTrackr outputs clear diagnostic notices rather than uncaught errors.',
    ],
    answer:
      'GitHub returns 422 when an organization has no public repositories or requires SAML SSO authorization. GitTrackr automatically catches 422 responses and displays a clean empty state. Ensure your organization administrator has authorized the GitTrackr OAuth application.',
  },
  {
    id: 8,
    category: 'Getting Started',
    question: 'Can I test GitTrackr without connecting my personal GitHub account?',
    summary: 'Try GitTrackr instantly with the fully interactive Sandbox Demo Mode.',
    badge: 'Demo Mode',
    steps: [
      'Navigate to http://localhost:3000/dashboard/octocat or click "Live Demo" in the navigation bar.',
      'Explore live dual-stream issue and PR triage, toggle KPI cards, test search queries, and switch Velocity Telemetry timeframes.',
      'Visit the landing page interactive cockpit to test components with simulated data.',
      'Once ready to track your real workload, click "Sign In with GitHub" to connect your account.',
    ],
    tips: [
      'Demo mode generates realistic telemetry anchored to GitHub’s octocat mascot profile.',
    ],
    answer:
      'Yes! GitTrackr provides a standalone Sandbox Demo Mode at /dashboard/octocat. You can evaluate the entire PR triage cockpit, velocity charts, and developer profile without signing in.',
  },
];
