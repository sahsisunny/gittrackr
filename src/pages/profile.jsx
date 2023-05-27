import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from '../assets/dummyProfileImage.png';
import Footer from '@/components/Footer';



const ProfilePage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);

  const fetchData = async (url, token, setDataCallback) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();
      setDataCallback(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString();

    return `${formattedDate} ${formattedTime}`;
  }

  useEffect(() => {
    if (session) {
      const userUrl = 'https://api.github.com/user';
      const orgsUrl = data?.organizations_url;
      const reposUrl = data?.repos_url;
      const token = session?.accessToken;

      fetchData(userUrl, token, setData);
      if (orgsUrl) {
        fetchData(orgsUrl, token, setOrgsData);
      }
      if (reposUrl) {
        fetchData(reposUrl, token, setReposData);
      }
    }
  }, [session, data]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <div className="main-container">
        <div className="profile-section">
          <div className="profile-photo">
            <Image
              src={data?.avatar_url || ProfileImage}
              alt="User Avatar"
              className="avatar-photo"
              width={200}
              height={200}
            />
          </div>
          {
            data?.name ? (
              <h5 className="text-center h5 mb-0">
                {data?.name || 'No name'}
              </h5>
            ) : (
              <h5 className="text-center h5 mb-0">
                {data?.login || 'No username'}
              </h5>
            )
          }
          <p className="text-center text-muted font-14">
            {data?.login || 'No username'}
          </p>
          <div className="follow">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>Followers</span>
                    <hr />
                    <h5>{data?.followers}</h5>
                  </td>
                  <td>
                    <span>Following</span>
                    <hr />
                    <h5>{data?.following}</h5>
                  </td>
                  <td>
                    <span>Public</span>
                    <hr />
                    <h5>{data?.public_repos}</h5>
                  </td>
                  <td>
                    <span>Private</span>
                    <hr />
                    <h5>{data?.total_private_repos}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Orgs */}
          <div>
            <h5 className="profile-title">Organizations</h5>
            <div className="profile-orgs-container">
              {orgsData?.map((org) => (
                <div key={org.id}>
                  <div
                    className="profile-orgs"
                    onClick={() => {
                      window.open(
                        `https://github.com/${org.login}`,
                        '_blank'
                      );
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
        <div className="repos-section">
          <h5 className="profile-title">Repositories</h5>
          <div
            className="repo-list"
          >
            {reposData?.map((repo) => (
              <div key={repo.id}>
                <div
                  className="repo-item"
                  onClick={() => {
                    window.open(`${repo.html_url}`, '_blank');
                  }}
                ><div className="repo-details">
                    
                  <div className="repo-item-left">
                    <span
                      className="repo-item-name"
                    >{repo.name}</span>
                </div>
                  <div className="repo-item-right">
                    <span
                      className="repo-item-language"
                    >{repo.language}</span>
                    <span
                      className="repo-item-privacy"
                    >{repo.private ? 'Private' : 'Public'}</span>
                    <span
                      className="repo-item-updated"
                    >{formatDate(repo.updated_at)}</span>
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
