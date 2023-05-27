import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from '../assets/dummyProfileImage.png';



const ProfilePage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
                <div className="pd-20 card-box height-100-p">
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
                    // render name if it exists, otherwise render username

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
                  <div>
                    <h5 className="profile-title">Repositories</h5>
                    <button
                      className="accordion"
                      onClick={() => {
                        setShowDropdown(!showDropdown);
                      }}
                    >
                      See Repositories
                    </button>
                    <div
                      className="panel"
                      style={{ display: showDropdown ? 'block' : 'none' }}
                    >
                      {reposData?.map((repo) => (
                        <div key={repo.id}>
                          <div
                            className="repos"
                            onClick={() => {
                              window.open(`${repo.html_url}`, '_blank');
                            }}
                          >
                            <span>{repo.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
