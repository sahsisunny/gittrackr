import { useSession, signIn, signOut } from "next-auth/react";

export default function Component(): JSX.Element {
  const { data } = useSession();
  const accessToken: any = data

  return (
    <>
      <h1>NextAuth.js Example</h1>
      <p>
        <strong>Token:</strong> {accessToken}
      </p>
      <p>
        <button onClick={() => signIn()}>Sign in</button>
        <button onClick={() => signOut()}>Sign out</button>
      </p>
    </>
  );
}
