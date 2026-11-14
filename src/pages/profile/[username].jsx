import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Layout from '@/components/Layout';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import ProfileGitHubRepository from '@/components/Profile/ProfileGitHubRepository';
import ProfileDetailsTab from '@/components/Profile/ProfileDetailsTab';

import { LANGUAGE_COLORS } from '@/constants/constants';
import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import fetchData from '@/utils/FetchData';
import { GITHUB_USERS_URL } from '@/constants/url';
import { DEMO_USER, DEMO_REPOS, DEMO_ORGS } from '@/mocks/demoData';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { username } = router.query;

  const isDemo = username === 'octocat' || (!session && status !== 'loading');

  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mostUsedLanguages, setMostUsedLanguages] = useState([]);
  const [activeTab, setActiveTab] = useState('github-stats');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setData(DEMO_USER);
      setOrgsData(DEMO_ORGS);
      setReposData(DEMO_REPOS);
      setMostUsedLanguages(['TypeScript', 'Go', 'Rust', 'Python', 'JavaScript']);
      setIsLoading(false);
      return;
    }

    if (session && username) {
      setIsLoading(true);
      const userUrl = `${GITHUB_USERS_URL}/${username}`;
      const token = session?.accessToken;

      fetchData(userUrl, token, (userData) => {
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
    const token = session.accessToken;

    if (orgsUrl) {
      fetchData(orgsUrl, token, (orgs) => {
        if (Array.isArray(orgs)) setOrgsData(orgs);
      });
    }

    if (reposUrl) {
      fetchData(reposUrl, token, (repos) => {
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
                JOIN_DATE={data?.created_at}
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
