import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Answers from './Answers';
import Btns from './Btns';
import Comments from './Comments';
import Header from './Header';
import Results from './Results';

const Poll = () => {
  const [results, setResults] = useState(false);

  const { id } = useRouter().query;

  console.log(id);

  return (
    <>
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
          {results ? <Results /> : <Answers />}
          <Btns results={results} setResults={setResults} />
          <Comments />
        </div>
      </div>
    </>
  );
};

export default Poll;
