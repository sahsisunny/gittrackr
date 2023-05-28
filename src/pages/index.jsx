import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import fetchData from '@/utils/FetchData';
import { GITHUB_USER_URL } from '@/constants/url';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { data: session } = useSession({ required: true });
  const [data, setData] = useState(null);
  const [orgsData, setOrgsData] = useState([]);

  useEffect(() => {
    if (session) {
      const userUrl = GITHUB_USER_URL;
      const token = session?.accessToken;

      fetchData(userUrl, token, setData);
    }
  }, [session]);

  useEffect(() => {
    if (session && data) {
      const orgsUrl = data.organizations_url;
      const token = session.accessToken;
      if (orgsUrl) {
        fetchData(orgsUrl, token, setOrgsData);
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
        <div className="section-one">
          <h5 className="section-title">Pull Requests</h5>
          <div></div>
        </div>
        <div className="section-two">
          <h5 className="section-title">Issues</h5>
          <div className="repo-list">
            {/* {reposData?.map((repo) => (
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
            ))} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
