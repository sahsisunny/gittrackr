import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import { RouteProgressBar } from '@/components/Loader';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RouteProgressBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
