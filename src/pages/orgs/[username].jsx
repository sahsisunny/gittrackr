import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Layout from '@/components/Layout';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import ProfileGitHubRepository from '@/components/Profile/ProfileGitHubRepository';
import ProfileDetailsTab from '@/components/Profile/ProfileDetailsTab';

import { LANGUAGE_COLORS } from '@/constants/constants';
import { GITHUB_ORGANIZATION_URL } from '@/constants/url';

import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import fetchData from '@/utils/FetchData';

const ProfilePage = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [mostUsedLanguages, setMostUsedLanguages] = useState([]);
  const [activeTab, setActiveTab] = useState('github-stats');

  const [filteredRepos, setFilteredRepos] = useState(reposData);
  const router = useRouter();
  const { username } = router.query;

  const filterRepos = () => {
    const filtered = reposData.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepos(filtered);
  };

  useEffect(() => {
    if (session) {
      const userUrl = `${GITHUB_ORGANIZATION_URL}/${username}`;
      const token = session?.accessToken;
      fetchData(userUrl, token, setData);
    }
  }, [session, username]);

  useEffect(() => {
    if (session && data) {
      const membersUrl = `https://api.github.com/orgs/${username}/members`;
      const reposUrl = `${data.repos_url}?page=1&per_page=100`;
      const token = session.accessToken;
      if (membersUrl) {
        fetchData(membersUrl, token, setUsersData);
      }
      if (reposUrl) {
        fetchData(reposUrl, token, (repos) => {
          setReposData(repos);
          setFilteredRepos(repos);
        });
      }
      getMostUsedLanguages(data.login, session).then((languages) => {
        setMostUsedLanguages(languages);
      });
    }
  }, [session, data]);

  useEffect(() => {
    filterRepos();
  }, [searchQuery]);

  return (
    <Layout title={`${username} | Org Profile`}>
      <div className="main-container-profile">
        <ProfileHeader
          NAME={data?.name}
          USERNAME={data?.login}
          COMPANY={data?.company}
          AVATAR_URL={data?.avatar_url}
        />
        <div className="section-details">
          <ProfileSidebar
            USERNAME={data?.login}
            WEBSITE={data?.blog}
            NAME={data?.name}
            mostUsedLanguages={mostUsedLanguages}
            languageColors={LANGUAGE_COLORS}
          />

          <div className="section-main">
            <ProfileDetailsTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {activeTab === 'github-stats' ? (
              <ProfileGitHubStats
                JOIN_DATE={data?.created_at}
                USER_FOLLOWERS={data?.followers}
                USER_FOLLOWING={data?.following}
                USER_PUBLIC_REPOS={data?.public_repos}
                usersData={usersData}
              />
            ) : (
              <ProfileGitHubRepository
                languageColors={LANGUAGE_COLORS}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredRepos={filteredRepos}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
