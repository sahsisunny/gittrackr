import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from '../assets/dummyProfileImage.png';
import Footer from '@/components/Footer';
import FormatDate from '@/utils/FormatDate';
import fetchData from '@/utils/FetchData';
import Link from 'next/link';

const ProfilePage = () => {
  const { data: session } = useSession({ required: true });
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRepos, setFilteredRepos] = useState(reposData);
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
    }
  }, [session, USER_ORG_URL, USER_REPOS_URL, TOKEN]);

  useEffect(() => {
    filterRepos();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>{NAME ? `${NAME} ` : USERNAME} | Profile</title>
      </Head>
      <Navbar />
      <div className="main-container">
        <div className="section-one">
          <h5 className="section-title">Profile Information</h5>
          <div className="profile-container">
            <Image
              src={AVATAR_URL || ProfileImage}
              alt="User Avatar"
              className="avatar-photo"
              width={200}
              height={200}
            />
            <div className="profile-name-container">
              {NAME ? (
                <h5 className="user-full-name">{NAME || 'No name'}</h5>
              ) : (
                <h5 className="user-login">{USERNAME || 'No username'}</h5>
              )}
            </div>
            <p className="user-login">{USERNAME || 'No username'}</p>
            <table className="profile-table">
              <tbody className="profile-table-body">
                <tr className="profile-table-row">
                  <td className="profile-table-data">
                    <span>Followers</span>
                    <hr />
                    <h5>{USER_FOLLOWERS}</h5>
                  </td>
                  <td className="profile-table-data">
                    <span>Following</span>
                    <hr />
                    <h5>{USER_FOLLOWING}</h5>
                  </td>
                  <td className="profile-table-data">
                    <span>Public Repos</span>
                    <hr />
                    <h5>{USER_PUBLIC_REPOS}</h5>
                  </td>
                  <td className="profile-table-data">
                    <span>Joined</span>
                    <hr />
                    <h5>{JOIN_DATE}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <h5 className="section-title">Organizations</h5>
              <div className="profile-orgs-container">
                {orgsData?.map((org) => (
                  <div key={org.id}>
                    <Link className="profile-orgs" href={`/orgs/${org.login}`}>
                      <Image
                        src={org.avatar_url}
                        alt="User Avatar"
                        className="org-photo"
                        width={50}
                        height={50}
                      />
                      <span>{org.login}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="section-two">
          <h5 className="section-title">Repositories</h5>
          <div className="repo-filters">
            <input
              type="text"
              placeholder="Search repositories..."
              className="repo-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="repo-filter-button"
              onClick={() => {
                filterRepos();
              }}
            >
              Search
            </button>
          </div>
          <div className="repo-list">
            {filteredRepos?.map((repo) => (
              <div key={repo.id}>
                <div
                  className="repo-item"
                  onClick={() => {
                    window.open(`${repo.html_url}`, '_blank');
                  }}
                >
                  <div className="repo-details">
                    <div className="repo-item-left">
                      <span className="repo-item-name">{repo.name}</span>
                    </div>
                    <div className="repo-item-right">
                      {repo.language ? (
                        <span className="repo-item-language">
                          {repo.language}
                        </span>
                      ) : (
                        <></>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
