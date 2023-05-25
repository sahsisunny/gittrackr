import React from 'react'
import { useSession, signOut, getSession } from "next-auth/react"

const dashboard = () => {
  const { data: session } = useSession({ required: true })
  if (session) {
    return (
      <>
        <p>
          Welcome to the dashboard {session.user?.name} <br />
          {/* print token */}
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      </>
    )
  } else {
    return (
      <>
        <p>
          You are not signed in. <br />
        </p>
      </>
    )
  }
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    }
  }
}

export default dashboard