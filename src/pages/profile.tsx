import { useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import Logo from '../assets/GitTrackr.png';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [orgsData, setOrgsData] = useState();
  const [reposData, setReposData] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  async function fetchUserData(token: string): Promise<void> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const userData = await response.json();
      setData(userData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  // function to fetch orgs list
  async function fetchOrgsData(orgUrl: string, token: string): Promise<void> {
    try {
      const response = await fetch(orgUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const orgsData = await response.json();
      setOrgsData(orgsData);
      console.log(orgsData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  // function to fetch repos list
  async function fetchReposData(repoUrl: string, token: string): Promise<void> {
    try {
      const response = await fetch(repoUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const reposData = await response.json();
      setReposData(reposData);
      console.log(reposData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    if (session) {
      fetchUserData(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchOrgsData(data?.organizations_url, session.accessToken);
      fetchReposData(data?.repos_url, session.accessToken);
    }
  }, [session, data]);

  if (!session) {
    return <div>Loading...</div>;
  }

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
                      src={data?.avatar_url || Logo}
                      alt="User Avatar"
                      className="avatar-photo"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h5 className="text-center h5 mb-0">
                    {data?.name || 'No name'}
                  </h5>
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
                            <span>Repositories</span>
                            <hr />
                            <h5>
                              {data?.public_repos + data?.total_private_repos}
                            </h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {/* join org list*/}
                    <h5 className="profile-title">Organizations</h5>
                    <div className="profile-orgs-container">
                      {orgsData?.map((org: any) => (
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
                  {/* Repo list in accordian */}
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
                      {reposData?.map((repo: any) => (
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

                  <div className="profile-social">
                    <h5 className="mb-20 h5 text-blue">Social Links</h5>
                    <ul className="clearfix">
                      <li>
                        <a
                          href="#"
                          className="btn"
                          data-bgcolor="#3b5998"
                          data-color="#ffffff"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-skills">
                    <h5 className="mb-20 h5 text-blue">Key Skills</h5>
                    <h6 className="mb-5 font-14">Bootstrap</h6>
                    <div className="progress mb-20" style={{ height: '6px' }}>
                      {/* progress bar */}
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
