import '../common/styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';

import MainLayout from '@/common/layouts/mainLayout';
import { queryClient } from '@/common/lib/queryClient';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
};

export default App;
