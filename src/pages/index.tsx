import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Dashboard = () => {
  const { data: session } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <div>
        {session && (
          <>
            <h1>
              Welcome {session.user?.name} <br />
            </h1>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
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
