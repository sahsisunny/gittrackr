import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

interface AppProps {
  Component: any;
  pageProps: any;
  session: any;
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {

  return (
    <SessionProvider session={session} refetchInterval={60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
