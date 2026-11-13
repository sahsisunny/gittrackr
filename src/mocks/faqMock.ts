export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FaqQnA: FAQItem[] = [
  {
    id: 1,
    question: 'What is GitTrackr and who is it designed for?',
    answer:
      'GitTrackr is a high-performance developer intelligence cockpit designed for open-source contributors, engineering squad leads, and developers managing multiple GitHub repositories. It consolidates pull requests, issues, review SLAs, and contributor velocity into a single real-time dashboard.',
  },
  {
    id: 2,
    question: 'How does GitTrackr track GitHub Pull Requests and Issues?',
    answer:
      'GitTrackr uses GitHub REST APIs to fetch real-time data across all repositories you own, contribute to, or are assigned tickets in. It provides live status filters (Open, Merged, Closed), velocity metrics, and instant search without switching browser tabs.',
  },
  {
    id: 3,
    question: 'Can I test GitTrackr without connecting my personal GitHub account?',
    answer:
      'Yes! GitTrackr features an interactive Live Demo Mode. You can visit /dashboard/octocat or /profile/demo to explore all features, metrics, filters, and UI workflows with realistic sandbox data without signing in.',
  },
  {
    id: 4,
    question: 'Is GitTrackr secure? Does it store my credentials or source code?',
    answer:
      'GitTrackr is strictly read-only and privacy-first. It authenticates through standard GitHub OAuth with minimal scopes (read:user, repo) required to query your contributions. GitTrackr never stores your passwords, private SSH keys, or repository source code.',
  },
  {
    id: 5,
    question: 'Can I track multiple organizations and repositories in GitTrackr?',
    answer:
      'Yes. GitTrackr supports organization navigation, allowing you to inspect multi-repository workspaces, contributor distributions, and language composition across entire GitHub organizations.',
  },
  {
    id: 6,
    question: 'Why was GitTrackr built and what problem does it solve?',
    answer:
      'GitTrackr was conceived during engineering sprints at Real Dev Squad, where contributors actively raised PRs and worked on tickets across dozens of decoupled microservices. Having to check 15+ tabs for PR reviews caused delays. GitTrackr was engineered to eliminate context switching and accelerate team review velocity.',
  },
];
