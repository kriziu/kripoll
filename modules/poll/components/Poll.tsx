import { useEffect, useState } from 'react';

import type { Poll } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import PollProvider from '../context/pollContext';
import type { PublicPoll } from '../context/pollContext';
import Answers from './Answers';
import Comments from './Comments';
import Header from './Header';
import Results from './Results';

const PollC = () => {
  const [results, setResults] = useState(false);
  const [poll, setPoll] = useState<PublicPoll | null>(null);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id)
      axios.get<Poll | null>(`/api/find?id=${id}`).then((res) => {
        if (!res.data) router.push('/');
        else setPoll(res.data);
      });
  }, [id, router]);

  if (!poll) return null;

  return (
    <PollProvider
      poll={poll}
      setPoll={(newPoll: PublicPoll) => setPoll(newPoll)}
    >
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
            <Results setResults={setResults} />
          ) : (
            <Answers setResults={setResults} />
          )}

          <Comments />
        </div>
      </div>
    </PollProvider>
  );
};

export default PollC;
