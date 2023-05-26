import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
