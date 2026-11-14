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
import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import fetchData from '@/utils/FetchData';
import { GITHUB_USERS_URL } from '@/constants/url';
import { DEMO_USER, DEMO_REPOS, DEMO_ORGS } from '@/mocks/demoData';

interface UserData {
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
  organizations_url?: string;
  message?: string;
}

interface OrgItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const username = typeof router.query.username === 'string' ? router.query.username : '';

  const isDemo = username === 'octocat' || (!session && status !== 'loading');

  const [data, setData] = useState<UserData | null>(null);
  const [orgsData, setOrgsData] = useState<OrgItem[]>([]);
  const [reposData, setReposData] = useState<RepoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mostUsedLanguages, setMostUsedLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('github-stats');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isDemo) {
      setData({
        login: DEMO_USER.login,
        name: DEMO_USER.name,
        company: DEMO_USER.company,
        avatar_url: DEMO_USER.image,
        blog: DEMO_USER.blog,
        bio: DEMO_USER.bio,
        created_at: DEMO_USER.created_at,
        followers: DEMO_USER.followers,
        following: DEMO_USER.following,
        public_repos: DEMO_USER.public_repos,
        repos_url: '',
        organizations_url: '',
      });
      setOrgsData(DEMO_ORGS as unknown as OrgItem[]);
      setReposData(DEMO_REPOS as unknown as RepoItem[]);
      setMostUsedLanguages(['TypeScript', 'Go', 'Rust', 'Python', 'JavaScript']);
      setIsLoading(false);
      return;
    }

    if (session && username) {
      setIsLoading(true);
      const userUrl = `${GITHUB_USERS_URL}/${username}`;
      const token = (session as { accessToken?: string })?.accessToken;

      fetchData<UserData>(userUrl, token, (userData) => {
        if (userData && !userData.message) {
          setData(userData);
        }
      });
    }
  }, [session, username, isDemo]);

  useEffect(() => {
    if (isDemo || !session || !data) return;

    const orgsUrl = data.organizations_url;
    const reposUrl = `${data.repos_url}?page=1&per_page=100`;
    const token = (session as { accessToken?: string }).accessToken;

    if (orgsUrl) {
      fetchData<OrgItem[]>(orgsUrl, token, (orgs) => {
        if (Array.isArray(orgs)) setOrgsData(orgs);
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
  }, [session, data, isDemo]);

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return reposData;
    const query = searchQuery.toLowerCase();
    return reposData.filter((repo) => repo.name.toLowerCase().includes(query));
  }, [reposData, searchQuery]);

  const displayName = data?.name || data?.login || username || 'Profile';

  return (
    <Layout
      title={`${displayName} | Profile`}
      description={`View GitHub repositories, contribution statistics, top programming languages, and organization memberships for ${displayName} on GitTrackr.`}
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
                orgsData={orgsData}
                username={data?.login || username}
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

export default ProfilePage;
