import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiInfo } from 'react-icons/fi';

import Layout from '@/components/Layout';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import ProfileGitHubRepository, { RepoItem } from '@/components/Profile/ProfileGitHubRepository';
import ProfileDetailsTab from '@/components/Profile/ProfileDetailsTab';

import { LANGUAGE_COLORS } from '@/constants/constants';
import fetchData from '@/utils/FetchData';
import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import { DEMO_USER, DEMO_REPOS, DEMO_ORGS } from '@/mocks/demoData';

interface OrgItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  login?: string;
  organizations_url?: string;
  repos_url?: string;
  followers?: number;
  following?: number;
  created_at?: string;
  public_repos?: number;
  company?: string;
  blog?: string;
  bio?: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isDemo = !session && status !== 'loading';

  const [orgsData, setOrgsData] = useState<OrgItem[]>([]);
  const [reposData, setReposData] = useState<RepoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mostUsedLanguages, setMostUsedLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('github-stats');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sessionUser = session?.user as ExtendedUser | undefined;
  const USERNAME = sessionUser?.login || (isDemo ? DEMO_USER.login : '');
  const NAME = sessionUser?.name || (isDemo ? DEMO_USER.name : '');
  const TOKEN = (session as { accessToken?: string })?.accessToken;
  const USER_ORG_URL = sessionUser?.organizations_url;
  const USER_REPOS_URL = sessionUser?.repos_url;
  const USER_FOLLOWERS = sessionUser?.followers ?? (isDemo ? DEMO_USER.followers : 0);
  const USER_FOLLOWING = sessionUser?.following ?? (isDemo ? DEMO_USER.following : 0);
  const JOIN_DATE = sessionUser?.created_at || (isDemo ? DEMO_USER.created_at : '');
  const AVATAR_URL = sessionUser?.image || (isDemo ? DEMO_USER.image : '');
  const USER_PUBLIC_REPOS = sessionUser?.public_repos ?? (isDemo ? DEMO_USER.public_repos : 0);
  const COMPANY = sessionUser?.company || (isDemo ? DEMO_USER.company : '');
  const WEBSITE = sessionUser?.blog || (isDemo ? DEMO_USER.blog : '');
  const BIO = sessionUser?.bio || (isDemo ? DEMO_USER.bio : '');

  useEffect(() => {
    if (isDemo) {
      setOrgsData(DEMO_ORGS as unknown as OrgItem[]);
      setReposData(DEMO_REPOS as unknown as RepoItem[]);
      setMostUsedLanguages(['TypeScript', 'Go', 'Rust', 'Python', 'JavaScript']);
      setIsLoading(false);
      return;
    }

    if (session && TOKEN) {
      setIsLoading(true);
      const reposUrl = `${USER_REPOS_URL}?page=1&per_page=100`;

      if (USER_ORG_URL) {
        fetchData<OrgItem[]>(USER_ORG_URL, TOKEN, (orgs) => {
          if (Array.isArray(orgs)) setOrgsData(orgs);
        });
      }

      if (reposUrl) {
        fetchData<RepoItem[]>(reposUrl, TOKEN, (repos) => {
          if (Array.isArray(repos)) setReposData(repos);
          setIsLoading(false);
        });
      }

      if (USERNAME) {
        getMostUsedLanguages(USERNAME, session).then((languages) => {
          if (Array.isArray(languages)) setMostUsedLanguages(languages);
        });
      }
    }
  }, [session, USER_ORG_URL, USER_REPOS_URL, TOKEN, USERNAME, isDemo]);

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return reposData;
    const query = searchQuery.toLowerCase();
    return reposData.filter((repo) => repo.name.toLowerCase().includes(query));
  }, [reposData, searchQuery]);

  return (
    <Layout
      title={`${NAME ? `${NAME} ` : USERNAME} | Profile`}
      description={`View GitHub repositories, contribution statistics, top programming languages, and organization memberships for ${NAME || USERNAME} on GitTrackr.`}
    >
      <main className="main-container-profile">
        {isDemo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <FiInfo color="#38bdf8" size={18} />
              <span>
                <strong>Sample Profile:</strong> Viewing demo developer profile for @{DEMO_USER.login}.
              </span>
            </div>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="nav-pill-btn"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
            >
              Sign In with GitHub
            </button>
          </div>
        )}

        <ProfileHeader
          NAME={NAME}
          USERNAME={USERNAME}
          COMPANY={COMPANY}
          AVATAR_URL={AVATAR_URL}
        />

        <div className="section-details">
          <ProfileSidebar
            USERNAME={USERNAME}
            WEBSITE={WEBSITE}
            NAME={NAME}
            BIO={BIO}
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
                JOIN_DATE={JOIN_DATE}
                USER_FOLLOWERS={USER_FOLLOWERS}
                USER_FOLLOWING={USER_FOLLOWING}
                USER_PUBLIC_REPOS={USER_PUBLIC_REPOS}
                orgsData={orgsData}
                username={USERNAME}
                onSelectTab={setActiveTab}
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
