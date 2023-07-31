// type issueTypeProp = {
//   issueType: string;
// };

// type filterSection = {
//   arg: string;
// };

export type FilterSectionProps = {
  filterIssues: (arg: string) => void;
};

// export type ListeSectionProps = {};

// export type DashoboardProp = {};

// export type AssigneeProp = {};

export type sessionProp = {
  accessToken: string;
  expires: string;
  user: userProp;
};

export type userProp = {
  created_at: string;
  email: string;
  followers: number;
  following: number;
  id: string;
  image: string;
  login: string;
  name: string;
  organizations_url: string;
  public_repos: number;
  repos_url: string;
  url: string;
};

export interface User {
  login: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface Session {
  user: User;
  // Add other properties if available in the Session object
}
