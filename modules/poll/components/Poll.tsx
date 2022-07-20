import { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Loader from '@/common/components/Loader';

import { usePoll } from '../hooks/usePoll';
import Answers from './Answers';
import Header from './Header';
import Results from './Results';
import Share from './Share';

const PollC = () => {
  const { isLoading, poll } = usePoll();

  const [results, setResults] = useState(false);
  const [password, setPassword] = useState('');

  if (isLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>Kripoll - {poll?.title}</title>
      </Head>

      <div className="ml-4 pt-4 md:ml-10 md:pt-10">
        <Link href="/">
          <a className="bg-gradient-to-br from-indigo-700 to-purple-500 bg-clip-text text-center text-4xl font-extrabold uppercase leading-none text-transparent">
            Kripoll
          </a>
        </Link>
      </div>

      <div className="mt-16 flex flex-col items-center md:mt-24">
        <div className="px-6 sm:w-96 sm:px-0 md:w-160">
          <Header />
          {results ? (
            <Results
              setResults={setResults}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <Answers setResults={setResults} />
          )}

          <Share />
        </div>
      </div>
    </>
  );
};

export default PollC;
