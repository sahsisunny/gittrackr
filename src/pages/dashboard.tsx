import React from 'react';
import { useSession, signOut, getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { data: session } = useSession({ required: true });

  
  if (session) {
    return (
      <>
        <Navbar />
        Welcome to the dashboard {session.user?.name} <br />
        <strong>Token:</strong> {session.accessToken} <br />
        <strong>Email:</strong> {session.user?.email} <br />
        <strong>Image:</strong> {session.user?.image} <br />
        <strong>Name:</strong> {session.user?.name} <br />
        <strong>ID:</strong> {session.user?.id} <br />
        <strong>ID:</strong> {session.user?.login} <br />

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
