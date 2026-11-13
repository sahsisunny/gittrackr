import developerSunny from '@/assets/developersImage/sunny.jpg';

export interface Developer {
  id: number;
  developerName: string;
  developerRole: string;
  isFounder?: boolean;
  developerImage: any;
  developerIntro: string;
  developerSkills: string[];
  developerTwitterId?: string;
  developerLinkedInId?: string;
  developerGithubId?: string;
  developerPortfolio?: string;
  side?: string;
}

export const aboutDevelopersMock: Developer[] = [
  {
    id: 1,
    developerName: 'Sunny Sahsi',
    developerRole: 'Software Engineer',
    isFounder: false,
    developerImage: developerSunny,
    developerIntro:
      "Hi, I'm Sunny Sahsi, a software engineer who enjoys building practical web applications. I built GitTrackr as a simple tool to easily view, filter, and track your GitHub pull requests, issues, and activity in one place.",
    developerSkills: [
      'Software Engineer',
      'React',
      'Next.js',
      'TypeScript',
      'GitHub API',
      'Open Source',
    ],
    developerTwitterId: 'https://twitter.com/SahsiSunny',
    developerLinkedInId: 'https://www.linkedin.com/in/sahsisunny/',
    developerGithubId: 'https://github.com/sahsisunny',
    developerPortfolio: 'https://sunnysahsi.com',
    side: 'center',
  },
];
