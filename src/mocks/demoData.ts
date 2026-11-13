export interface DemoUser {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  image: string;
  bio: string;
  company: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  organizations_url: string;
  repos_url: string;
}

export interface DemoItem {
  id: number;
  title: string;
  html_url: string;
  state: 'open' | 'closed' | 'merged';
  created_at: string;
  repository_url: string;
  user: { login: string };
  assignee?: { login: string };
  pull_request?: {
    merged_at: string | null;
  };
  comments_count?: number;
  labels?: { name: string; color: string }[];
}

export interface DemoRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  updated_at: string;
}

export interface DemoOrg {
  id: number;
  login: string;
  avatar_url: string;
  description: string;
}

export const DEMO_USER: DemoUser = {
  id: '583231',
  login: 'octocat',
  name: 'The Octocat',
  email: 'octocat@github.com',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  image: 'https://avatars.githubusercontent.com/u/583231?v=4',
  bio: 'Building tools for open-source developers worldwide. Passionate about Git, collaboration, and high-performance engineering.',
  company: '@GitHub',
  blog: 'https://github.blog',
  followers: 14820,
  following: 9,
  public_repos: 48,
  created_at: '2011-01-25T18:44:36Z',
  organizations_url: 'https://api.github.com/users/octocat/orgs',
  repos_url: 'https://api.github.com/users/octocat/repos',
};

export const DEMO_ORGS: DemoOrg[] = [
  {
    id: 1,
    login: 'github',
    avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
    description: 'How people build software.',
  },
  {
    id: 2,
    login: 'vercel',
    avatar_url: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    description: 'Develop. Preview. Ship.',
  },
  {
    id: 3,
    login: 'tailwindlabs',
    avatar_url: 'https://avatars.githubusercontent.com/u/67104408?v=4',
    description: 'Makers of Tailwind CSS and Tailwind UI.',
  },
];

export const DEMO_REPOS: DemoRepo[] = [
  {
    id: 101,
    name: 'gittrackr',
    html_url: 'https://github.com/octocat/gittrackr',
    description: 'High-performance GitHub developer analytics & issue/PR cockpit.',
    language: 'TypeScript',
    stargazers_count: 342,
    forks_count: 58,
    private: false,
    updated_at: '2026-11-12T19:30:00Z',
  },
  {
    id: 102,
    name: 'workflow-engine',
    html_url: 'https://github.com/octocat/workflow-engine',
    description: 'Event-driven CI/CD workflow automation pipeline with zero latency.',
    language: 'Go',
    stargazers_count: 814,
    forks_count: 124,
    private: false,
    updated_at: '2026-11-10T14:15:00Z',
  },
  {
    id: 103,
    name: 'ui-primitives',
    html_url: 'https://github.com/octocat/ui-primitives',
    description: 'Accessible, headless components adhering to WAI-ARIA and modern web standards.',
    language: 'TypeScript',
    stargazers_count: 512,
    forks_count: 42,
    private: false,
    updated_at: '2026-11-08T09:45:00Z',
  },
  {
    id: 104,
    name: 'octo-cli',
    html_url: 'https://github.com/octocat/octo-cli',
    description: 'Terminal client for triaging pull requests, issues, and organization teams.',
    language: 'Rust',
    stargazers_count: 275,
    forks_count: 31,
    private: false,
    updated_at: '2026-11-05T16:20:00Z',
  },
  {
    id: 105,
    name: 'metrics-telemetry',
    html_url: 'https://github.com/octocat/metrics-telemetry',
    description: 'Real-time telemetry ingestion and time-series aggregation service.',
    language: 'Python',
    stargazers_count: 189,
    forks_count: 22,
    private: false,
    updated_at: '2026-10-28T11:00:00Z',
  },
  {
    id: 106,
    name: 'docs-site',
    html_url: 'https://github.com/octocat/docs-site',
    description: 'Modern developer documentation built with Next.js and MDX.',
    language: 'JavaScript',
    stargazers_count: 98,
    forks_count: 16,
    private: false,
    updated_at: '2026-10-20T08:10:00Z',
  },
];

export const DEMO_PRS: DemoItem[] = [
  {
    id: 201,
    title: 'feat(dashboard): add live real-time metrics telemetry and filters',
    html_url: 'https://github.com/octocat/gittrackr/pull/201',
    state: 'open',
    created_at: '2026-11-12T16:20:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    pull_request: { merged_at: null },
    comments_count: 4,
    labels: [
      { name: 'enhancement', color: '0075ca' },
      { name: 'dashboard', color: '5319e7' },
    ],
  },
  {
    id: 202,
    title: 'fix(auth): improve session token refresh reliability and error handling',
    html_url: 'https://github.com/octocat/gittrackr/pull/202',
    state: 'merged',
    created_at: '2026-11-11T12:00:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    pull_request: { merged_at: '2026-11-11T18:45:00Z' },
    comments_count: 2,
    labels: [{ name: 'bug', color: 'd73a4a' }],
  },
  {
    id: 203,
    title: 'perf(profile): memoize language distribution and repository queries',
    html_url: 'https://github.com/octocat/gittrackr/pull/203',
    state: 'merged',
    created_at: '2026-11-09T10:30:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    pull_request: { merged_at: '2026-11-09T15:20:00Z' },
    comments_count: 1,
    labels: [{ name: 'performance', color: 'fbca04' }],
  },
  {
    id: 204,
    title: 'refactor(ui): adopt modern CSS tokens, dark palette, and glassmorphism',
    html_url: 'https://github.com/octocat/gittrackr/pull/204',
    state: 'merged',
    created_at: '2026-11-07T14:10:00Z',
    repository_url: 'https://api.github.com/repos/octocat/ui-primitives',
    user: { login: 'octocat' },
    pull_request: { merged_at: '2026-11-08T09:12:00Z' },
    comments_count: 6,
    labels: [{ name: 'ui/ux', color: '1d76db' }],
  },
  {
    id: 205,
    title: 'test(e2e): add end-to-end user navigation & filter tests with Playwright',
    html_url: 'https://github.com/octocat/workflow-engine/pull/205',
    state: 'closed',
    created_at: '2026-11-04T08:50:00Z',
    repository_url: 'https://api.github.com/repos/octocat/workflow-engine',
    user: { login: 'octocat' },
    pull_request: { merged_at: null },
    comments_count: 3,
    labels: [{ name: 'testing', color: 'bfdadc' }],
  },
];

export const DEMO_ISSUES: DemoItem[] = [
  {
    id: 301,
    title: 'Support multi-state filtering (Open, Merged, Closed) with quick badge toggles',
    html_url: 'https://github.com/octocat/gittrackr/issues/301',
    state: 'open',
    created_at: '2026-11-12T11:15:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    assignee: { login: 'octocat' },
    comments_count: 5,
    labels: [
      { name: 'feature', color: 'a2eeef' },
      { name: 'priority: high', color: 'e11d48' },
    ],
  },
  {
    id: 302,
    title: 'Add keyboard navigation shortcuts for switching dashboard and repo tabs',
    html_url: 'https://github.com/octocat/gittrackr/issues/302',
    state: 'open',
    created_at: '2026-11-10T15:40:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    assignee: { login: 'octocat' },
    comments_count: 2,
    labels: [{ name: 'accessibility', color: '0075ca' }],
  },
  {
    id: 303,
    title: 'Optimize avatar caching on high-frequency organization changes',
    html_url: 'https://github.com/octocat/gittrackr/issues/303',
    state: 'closed',
    created_at: '2026-11-06T09:20:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    assignee: { login: 'octocat' },
    comments_count: 4,
    labels: [{ name: 'performance', color: 'fbca04' }],
  },
  {
    id: 304,
    title: 'Provide one-click copy for repository clone URLs and commit hashes',
    html_url: 'https://github.com/octocat/ui-primitives/issues/304',
    state: 'open',
    created_at: '2026-11-03T18:05:00Z',
    repository_url: 'https://api.github.com/repos/octocat/ui-primitives',
    user: { login: 'octocat' },
    assignee: { login: 'octocat' },
    comments_count: 1,
    labels: [{ name: 'good first issue', color: '7057ff' }],
  },
  {
    id: 305,
    title: 'Resolve dark mode contrast border alignment in responsive sidebar',
    html_url: 'https://github.com/octocat/gittrackr/issues/305',
    state: 'closed',
    created_at: '2026-10-25T13:30:00Z',
    repository_url: 'https://api.github.com/repos/octocat/gittrackr',
    user: { login: 'octocat' },
    assignee: { login: 'octocat' },
    comments_count: 3,
    labels: [{ name: 'bug', color: 'd73a4a' }],
  },
];

