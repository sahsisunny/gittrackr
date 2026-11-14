import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Layout from '@/components/Layout';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import ProfileGitHubRepository, { RepoItem } from '@/components/Profile/ProfileGitHubRepository';
import ProfileDetailsTab from '@/components/Profile/ProfileDetailsTab';

import { LANGUAGE_COLORS } from '@/constants/constants';
import { GITHUB_ORGANIZATION_URL } from '@/constants/url';
import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import fetchData from '@/utils/FetchData';
import { DEMO_ORGS, DEMO_REPOS } from '@/mocks/demoData';

interface OrgUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface OrgData {
  login?: string;
  name?: string;
  company?: string;
  avatar_url?: string;
  blog?: string;
  bio?: string;
  created_at?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  repos_url?: string;
  message?: string;
}

const OrgProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<OrgData | null>(null);
  const [reposData, setReposData] = useState<RepoItem[]>([]);
  const [usersData, setUsersData] = useState<OrgUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mostUsedLanguages, setMostUsedLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('github-stats');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const username = typeof router.query.username === 'string' ? router.query.username : '';

  const isDemo = !session || username === 'github' || username === 'vercel';

  useEffect(() => {
    if (isDemo) {
      const matchOrg = DEMO_ORGS.find((o) => o.login === username) || DEMO_ORGS[0];
      setData({
        login: matchOrg.login,
        name: matchOrg.login.toUpperCase(),
        company: matchOrg.description,
        avatar_url: matchOrg.avatar_url,
        blog: `https://${matchOrg.login}.com`,
        bio: matchOrg.description,
        created_at: '2012-01-01T00:00:00Z',
        followers: 45000,
        following: 0,
        public_repos: 120,
      });
      setReposData(DEMO_REPOS as unknown as RepoItem[]);
      setUsersData([
        { id: 1, login: 'octocat', avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4', html_url: 'https://github.com/octocat' },
        { id: 2, login: 'defunkt', avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4', html_url: 'https://github.com/defunkt' },
      ]);
      setMostUsedLanguages(['TypeScript', 'Go', 'Rust', 'JavaScript']);
      setIsLoading(false);
      return;
    }

    if (session && username) {
      setIsLoading(true);
      const userUrl = `${GITHUB_ORGANIZATION_URL}/${username}`;
      const token = (session as { accessToken?: string })?.accessToken;
      fetchData<OrgData>(userUrl, token, (orgData) => {
        if (orgData && !orgData.message) {
          setData(orgData);
        }
      });
    }
  }, [session, username, isDemo]);

  useEffect(() => {
    if (isDemo || !session || !data) return;

    const membersUrl = `https://api.github.com/orgs/${username}/members`;
    const reposUrl = `${data.repos_url}?page=1&per_page=100`;
    const token = (session as { accessToken?: string }).accessToken;

    if (membersUrl) {
      fetchData<OrgUser[]>(membersUrl, token, (members) => {
        if (Array.isArray(members)) setUsersData(members);
      });
    }

    if (reposUrl) {
      fetchData<RepoItem[]>(reposUrl, token, (repos) => {
        if (Array.isArray(repos)) {
          setReposData(repos);
          setIsLoading(false);
        }
      });
    }

    if (data.login) {
      getMostUsedLanguages(data.login, session).then((languages) => {
        if (Array.isArray(languages)) setMostUsedLanguages(languages);
      });
    }
  }, [session, data, username, isDemo]);

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return reposData;
    const query = searchQuery.toLowerCase();
    return reposData.filter((repo) => repo.name.toLowerCase().includes(query));
  }, [reposData, searchQuery]);

  const displayName = data?.name || data?.login || username || 'Org Profile';

  return (
    <Layout
      title={`${displayName} | Organization Profile`}
      description={`Explore repositories, active contributors, and technology stack composition for GitHub organization ${displayName} on GitTrackr.`}
    >
      <main className="main-container-profile">
        <ProfileHeader
          NAME={data?.name}
          USERNAME={data?.login || username}
          COMPANY={data?.company}
          AVATAR_URL={data?.avatar_url}
        />
        <div className="section-details">
          <ProfileSidebar
            USERNAME={data?.login || username}
            WEBSITE={data?.blog}
            NAME={data?.name}
            BIO={data?.bio}
            mostUsedLanguages={mostUsedLanguages}
            languageColors={LANGUAGE_COLORS}
          />

          <div className="section-main">
            <ProfileDetailsTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              reposCount={reposData.length}
            />

            {activeTab === 'github-stats' ? (
              <ProfileGitHubStats
                JOIN_DATE={data?.created_at || ''}
                USER_FOLLOWERS={data?.followers ?? 0}
                USER_FOLLOWING={data?.following ?? 0}
                USER_PUBLIC_REPOS={data?.public_repos ?? 0}
                usersData={usersData}
                isDemo={isDemo}
              />
            ) : (
              <ProfileGitHubRepository
                languageColors={LANGUAGE_COLORS}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredRepos={filteredRepos}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrgProfilePage;
