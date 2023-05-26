import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const { data: session } = useSession({ required: true });

  if (session) {
    return (
      <>
        <Navbar />
        Welcome to the dashboard {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <p>You are not signed in.</p>
      </>
    );
  }
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
