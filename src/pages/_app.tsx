import { SessionProvider } from "next-auth/react";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;