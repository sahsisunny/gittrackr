import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from '../../assets/dummyProfileImage.png';
import Footer from '@/components/Footer';
import FormatDate from '@/utils/FormatDate';
import fetchData from '@/utils/FetchData';
import { GITHUB_USERS_URL } from '@/constants/url';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
      const userUrl = `${GITHUB_USERS_URL}/${username}`;
      const token = session?.accessToken;

      fetchData(userUrl, token, setData);
    }
  }, [session, username]);

  useEffect(() => {
    if (session && data) {
      const orgsUrl = data.organizations_url;
      const reposUrl = `${data.repos_url}?page=1&per_page=100`;
      const token = session.accessToken;

      if (orgsUrl) {
        fetchData(orgsUrl, token, setOrgsData);
      }

      if (reposUrl) {
        fetchData(reposUrl, token, (repos) => {
          setReposData(repos);
          setFilteredRepos(repos);
        });
      }
    }
  }, [session, data]);

  useEffect(() => {
    filterRepos();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>{data?.name ? `${data?.name} ` : data?.login} | Profile</title>
      </Head>
      <Navbar />
      <div className="main-container">
        <div className="section-one">
          <h5 className="section-title">Profile Information</h5>
          <div className="profile-container">
            <Image
              src={data?.avatar_url || ProfileImage}
              alt="User Avatar"
              className="avatar-photo"
              width={200}
              height={200}
            />
            <div className="profile-name-container">
              {data?.name ? (
                <h5 className="user-full-name">{data?.name || 'No name'}</h5>
              ) : (
                <h5 className="user-login">{data?.login || 'No username'}</h5>
              )}
            </div>
            <p className="user-login">{data?.login || 'No username'}</p>
            <table className="profile-table">
              <tbody className="profile-table-body">
                <tr className="profile-table-row">
                  <td className="profile-table-data">
                    <span>Followers</span>
                    <hr />
                    <h5>{data?.followers}</h5>
                  </td>
                  <td className="profile-table-data">
                    <span>Following</span>
                    <hr />
                    <h5>{data?.following}</h5>
                  </td>
                  <td className="profile-table-data">
                    <span>Public Repos</span>
                    <hr />
                    <h5>{data?.public_repos}</h5>
                  </td>
                  {data?.total_private_repos ? (
                    <td className="profile-table-data">
                      <span>Private Repos</span>
                      <hr />
                      <h5>{data?.total_private_repos}</h5>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              </tbody>
            </table>
            <div>
              <h5 className="section-title">Organizations</h5>
              <div className="profile-orgs-container">
                {orgsData?.map((org) => (
                  <div key={org.id}>
                    <div
                      className="profile-orgs"
                      onClick={() => {
                        router.push(`/orgs/${org.login}`);
                      }}
                    >
                      <Image
                        src={org.avatar_url}
                        alt="User Avatar"
                        className="org-photo"
                        width={50}
                        height={50}
                      />
                      <span>{org.login}</span>
                    </div>
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
