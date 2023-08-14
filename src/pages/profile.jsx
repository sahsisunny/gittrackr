import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from '../assets/dummyProfileImage.png';
import Footer from '@/components/Footer';
import FormatDate from '@/utils/FormatDate';
import fetchData from '@/utils/FetchData';
import getMostUsedLanguages from '@/utils/mostUsedLanguage';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { TbWorldWww } from 'react-icons/tb';

import { FaGithubSquare } from 'react-icons/fa';
import Link from 'next/link';

import moment from 'moment';

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

  const languageColors = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    TypeScript: '#2b7489',
    Python: '#3572a5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Ruby: '#701516',
    PHP: '#4f5d95',
    'C#': '#178600',
    Go: '#00ADD8',
    Kotlin: '#F18E33',
    Vue: '#2c3e50',
    'Objective-C': '#438eff',
    Rust: '#dea584',
    'Jupyter Notebook': '#DA5B0B',
    Dart: '#00B4AB',
    Swift: '#ffac45',
    Assembly: '#6E4C13',
    R: '#198CE7',
    Scala: '#c22d40',
    TeX: '#3D6117',
    PowerShell: '#012456',
    Haskell: '#5e5086',
    Lua: '#000080',
    Clojure: '#db5855',
    Perl: '#0298c3',
  };

  function isColorLight(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }

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
        fetchData(USER_ORG_URL, TOKEN, setOrgsData);
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
        <div className="section-profile">
          <div className="profile-image">
            <Image
              src={AVATAR_URL || ProfileImage}
              alt="User Avatar"
              className="avatar-photo"
              width={200}
              height={200}
            />
          </div>
          <div className="profile-header">
            {NAME ? (
              <h5 className="user-name">{NAME || 'No name'}</h5>
            ) : (
              <h5 className="user-login">{USERNAME || 'No username'}</h5>
            )}
            {COMPANY && <h5 className="user-company">Worked at {COMPANY}</h5>}
            <p className="user-login">
              <AiFillGithub />
              {USERNAME}
            </p>
          </div>
        </div>
        <div className="section-details">
          <div className="section-sidebar">
            <div className="sidebar-container">
              <h5 className="section-sidebar-title">Social Links</h5>
              <div className="social-links-container">
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href={`https://twitter.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <AiFillTwitterSquare />
                </a>
                <a
                  href={`https://www.linkedin.com/in/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <AiFillLinkedin />
                </a>
                {WEBSITE && (
                  <a
                    href={WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <TbWorldWww />
                  </a>
                )}
              </div>
            </div>
            <div className="sidebar-container">
              <h5 className="section-sidebar-title">
                {NAME ? `${NAME}'s Bio` : 'Bio'}
              </h5>
              {BIO && <p className="user-bio">{BIO}</p>}
            </div>
            <div className="sidebar-container">
              <h5 className="section-sidebar-title">Most Used Languages</h5>
              <div className="languages-container">
                {mostUsedLanguages.map((language, index) => {
                  const bgColor = languageColors[language];
                  const textColor = isColorLight(bgColor) ? '#000' : '#fff';

                  return (
                    <span
                      className="language"
                      key={index}
                      data-language={language}
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                    >
                      {language}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="section-main">
            <div className="section-tab">
              <button
                className={`tab-button ${
                  activeTab === 'github-stats' && 'active-tab'
                }`}
                onClick={() => setActiveTab('github-stats')}
              >
                Github Stats
              </button>
              <button
                className={`tab-button ${
                  activeTab === 'repos' && 'active-tab'
                }`}
                onClick={() => setActiveTab('repos')}
              >
                Repositories
              </button>
            </div>

            {activeTab === 'github-stats' ? (
              <div className="section-tab-content">
                <div className="profile-stats">
                  <div className="profile-stats-items">
                    <p>Joined GitHub</p>
                    <hr />
                    <p>{moment(JOIN_DATE).fromNow()}</p>
                  </div>
                  <div className="profile-stats-items">
                    <p>Followers</p>
                    <hr />
                    <p>{USER_FOLLOWERS}</p>
                  </div>
                  <div className="profile-stats-items">
                    <p>Following</p>
                    <hr />
                    <p>{USER_FOLLOWING}</p>
                  </div>
                  <div className="profile-stats-items">
                    <p>Public Repos</p>
                    <hr />
                    <p>{USER_PUBLIC_REPOS}</p>
                  </div>
                </div>

                {orgsData.length > 0 && (
                  <div className="orgs-container">
                    <h5 className="section-sidebar-title">Organizations</h5>
                    <div className="orgs-list-container">
                      {orgsData.map((org) => (
                        <a
                          href={org.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={org.id}
                          className="orgs-list-item"
                        >
                          <Image
                            src={org.avatar_url}
                            alt="Org Avatar"
                            className="org-avatar"
                            width={50}
                            height={50}
                          />
                          <p className="org-name">{org.login}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {/* TODO: Have to add more stats here */}
              </div>
            ) : (
              <div className="section-tab-content">
                <div className="repo-filters-container">
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    className="repo-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="repo-search-button"
                    onClick={() => {
                      filterRepos();
                    }}
                  >
                    Search
                  </button>
                </div>
                <div className="repo-list-container">
                  {filteredRepos?.map((repo, index) => (
                    <div key={repo.id} className="repo-items">
                      <div className="repo-details">
                        <div className="repo-item-left">
                          <span className="repo-item-name">
                            {index + 1 + '. '}
                            {repo.name}
                          </span>
                        </div>
                        <div className="repo-item-right">
                          {repo.language && (
                            <span
                              className="repo-item-language"
                              style={{
                                backgroundColor: languageColors[repo.language],
                                color: isColorLight(
                                  languageColors[repo.language]
                                )
                                  ? '#000'
                                  : '#fff',
                              }}
                            >
                              {repo.language}
                            </span>
                          )}
                          <span className="repo-item-privacy">
                            {repo.private ? 'Private' : 'Public'}
                          </span>
                          <span className="repo-item-updated">
                            {FormatDate(repo.updated_at)}
                          </span>
                        </div>
                      </div>
                      <button
                        className="repo-view-btn"
                        onClick={() => {
                          window.open(`${repo.html_url}`, '_blank');
                        }}
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
