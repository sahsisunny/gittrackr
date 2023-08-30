import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSidebar from '@/components/Profile/ProfileSidebar';
import ProfileGitHubStats from '@/components/Profile/ProfileGitHubStats';
import ProfileGitHubRepository from '@/components/Profile/ProfileGitHubRepository';
import ProfileDetailsTab from '@/components/Profile/ProfileDetailsTab';

import { LANGUAGE_COLORS } from '@/constants/constants';

import FormatDate from '@/utils/FormatDate';
import fetchData from '@/utils/FetchData';
import getMostUsedLanguages from '@/utils/mostUsedLanguage';

const ProfilePage = () => {
  const { data: session } = useSession({ required: true });
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRepos, setFilteredRepos] = useState(reposData);
  const [mostUsedLanguages, setMostUsedLanguages] = useState([]);
  const [activeTab, setActiveTab] = useState('github-stats');
  const USERNAME = session?.user?.login;
  const NAME = session?.user?.name;
  const TOKEN = session?.accessToken;
  const USER_ORG_URL = session?.user?.organizations_url;
  const USER_REPOS_URL = session?.user?.repos_url;
  const USER_FOLLOWERS = session?.user?.followers;
  const USER_FOLLOWING = session?.user?.following;
  const JOIN_DATE = FormatDate(session?.user?.created_at);
  const AVATAR_URL = session?.user?.image;
  const USER_PUBLIC_REPOS = session?.user?.public_repos;
  const COMPANY = session?.user?.company;
  const WEBSITE = session?.user?.blog;
  const BIO = session?.user?.bio;

  const filterRepos = () => {
    const filtered = reposData.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepos(filtered);
  };

  useEffect(() => {
    if (session) {
      const reposUrl = `${USER_REPOS_URL}?page=1&per_page=100`;

      if (USER_ORG_URL) {
        fetchData(USER_ORG_URL, TOKEN, (orgs) => {
          setOrgsData(orgs);
        });
      }

      if (reposUrl) {
        fetchData(reposUrl, TOKEN, (repos) => {
          setReposData(repos);
          setFilteredRepos(repos);
        });
      }

      getMostUsedLanguages(USERNAME, session).then((languages) => {
        setMostUsedLanguages(languages);
      });
    }
  }, [session, USER_ORG_URL, USER_REPOS_URL, TOKEN, USERNAME]);

  useEffect(() => {
    filterRepos();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>{NAME ? `${NAME} ` : USERNAME} | Profile</title>
      </Head>

      <Navbar />

      <div className="main-container-profile">
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
            />

            {activeTab === 'github-stats' ? (
              <ProfileGitHubStats
                JOIN_DATE={JOIN_DATE}
                USER_FOLLOWERS={USER_FOLLOWERS}
                USER_FOLLOWING={USER_FOLLOWING}
                USER_PUBLIC_REPOS={USER_PUBLIC_REPOS}
                orgsData={orgsData}
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
      <Footer />
    </>
  );
};

export default ProfilePage;
