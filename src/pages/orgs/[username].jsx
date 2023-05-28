import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileImage from './../../assets/dummyProfileImage.png';
import Footer from '@/components/Footer';
import FormatDate from '@/utils/FormatDate';
import fetchData from '@/utils/FetchData';
import { GITHUB_ORGANIZATION_URL } from '@/constants/url';
import { useRouter } from 'next/router';


const ProfilePage = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const router = useRouter();
  const { username } = router.query;

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
      const reposUrl = data.repos_url;
      const token = session.accessToken;

      if (membersUrl) {
        fetchData(membersUrl, token, setMembersData);
      }
      console.log(membersData);

      if (reposUrl) {
        fetchData(reposUrl, token, setReposData);
      }
    }
  }, [session, data]);


  return (
    <>
      <Head>
        <title>
          {username?.split('-').map((word) => (
            word.charAt(0).toUpperCase() + word.slice(1) + ' '
          ))}
        </title>
      </Head>
      <Navbar />
      <div className="main-container">
        <div className="section-one">
          <h5 className="section-title">
            Profile Information
          </h5>
          <Image
            src={data?.avatar_url || ProfileImage}
            alt="User Avatar"
            className="avatar-photo"
            width={200}
            height={200}
          />
          <div className="profile-name-container">
            {
              data?.name ? (
                <h5 className="user-full-name">
                  {data?.name || 'No name'}
                </h5>
              ) : (
                <h5 className="user-login">
                  {data?.login || 'No username'}
                </h5>
              )
            }
          </div>
          <p className="user-login">
            {data?.login || 'No username'}
          </p>
          <table className="profile-table">
            <tbody className="profile-table-body">
              <tr className="profile-table-row">
                <td className="profile-table-data">
                  <span>Followers</span>
                  <hr />
                  <h5>{data?.followers}</h5>
                </td>
                <td className="profile-table-data">
                  <span>Public Repos</span>
                  <hr />
                  <h5>{data?.public_repos}</h5>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Orgs */}
          <div>
            <h5 className="section-title">Members</h5>
            <div className="profile-members-container">
              {membersData?.map((members) => (
                <div key={members.id}>
                  <div
                    className="profile-members-item"
                    onClick={() => {
                      router.push(`/profiles/${members.login}`);
                    }}
                  >
                    <Image
                      src={members.avatar_url}
                      alt="User Avatar"
                      className="members-photo"
                      width={50}
                      height={50}
                    />
                    <span
                      className="members-name"
                    >{members.login}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-two">
          <h5 className="section-title">Repositories</h5>
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
                      {
                        repo.language ? (
                          <span
                            className="repo-item-language"
                          >{repo.language}</span>
                        ) : (
                          <></>
                        )
                      }
                      <span
                        className="repo-item-privacy"
                      >{repo.private ? 'Private' : 'Public'}</span>
                      <span
                        className="repo-item-updated"
                      >{FormatDate(repo.updated_at)}</span>
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
