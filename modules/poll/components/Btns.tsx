import { Dispatch, SetStateAction, useState } from 'react';

import axios from 'axios';
import { BiArrowBack, BiStation } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { useMutation } from 'react-query';

import { usePoll } from '../hooks/usePoll';

export interface VoteType {
  pollId: string;
  checkedAnswers: number[];
}

interface Props {
  results?: boolean;
  setResults: Dispatch<SetStateAction<boolean>>;
  checkedAnswers?: number[];
}

const Btns = ({ results, setResults, checkedAnswers }: Props) => {
  const { poll } = usePoll();

  const [error, setError] = useState('');

  const voteMutation = useMutation(() =>
    axios.post('/api/vote', {
      pollId: poll?.id,
      checkedAnswers,
    })
  );

  const handleVote = () => {
    setError('');

    if (!checkedAnswers?.length) setError('Please select an answer.');
    if (results || !checkedAnswers || !checkedAnswers.length) return;

    voteMutation.mutate();
  };

  return (
    <div className="mt-6">
      <p className="mb-1 font-semibold text-red-500">
        {error} {voteMutation.error && !error && 'You already voted!'}
      </p>
      <div className="flex w-full gap-4">
        {results && (
          <div className="btn flex flex-1 select-none items-center justify-center gap-1 from-lime-500 to-green-600">
            <BiStation /> Live results
          </div>
        )}
        {!results && (
          <button className="btn flex-1" onClick={handleVote}>
            Vote
          </button>
        )}

        <div className="flex flex-1 gap-4">
          {results && (
            <button
              className="btn-secondary flex flex-1 items-center justify-center gap-1"
              onClick={() => setResults(false)}
            >
              <BiArrowBack /> Poll
            </button>
          )}
          {!results && (
            <button
              className="btn-secondary flex flex-1 items-center justify-center gap-1"
              onClick={() => setResults(true)}
            >
              <IoIosStats /> Results
            </button>
          )}

          <button className="btn-secondary flex flex-1 items-center justify-center gap-1">
            <FaShare /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Btns;
