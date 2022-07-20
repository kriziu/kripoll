import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiArrowBack, BiStation } from 'react-icons/bi';
import { IoIosStats } from 'react-icons/io';
import { toast } from 'react-toastify';

import Spinner from '@/common/components/Spinner';

import { usePoll } from '../hooks/usePoll';

export interface VoteType {
  pollId: string;
  checkedAnswers: number[];
  name?: string;
}

interface Props {
  results?: boolean;
  setResults: Dispatch<SetStateAction<boolean>>;
  checkedAnswers?: number[];
  name?: string;
}

const Btns = ({ results, setResults, checkedAnswers, name }: Props) => {
  const { poll } = usePoll();

  const voteMutation = useMutation(
    () =>
      axios.post<{ cookie?: boolean }>('/api/vote', {
        pollId: poll?.id,
        checkedAnswers,
        name,
      }),
    {
      onSuccess: (res) => {
        toast.success('Succesfully voted!');
        if (res.data.cookie)
          Cookies.set('poll-vote', poll!.id, { path: `/${poll?.id}` });
      },
      onError: () => {
        toast.error('You have already voted!');
      },
    }
  );

  const handleVote = () => {
    if (!checkedAnswers?.length) {
      toast.error('Please select an answer.');
      return;
    }

    if (poll?.requireName && (!name || name.length < 3)) {
      toast.error('Please enter your name.');
      return;
    }

    if (poll?.endDate && new Date(poll.endDate).getTime() < Date.now()) {
      toast.error('This poll has ended.');
      return;
    }

    if (Cookies.get('poll-vote')) {
      toast.error('You have already voted!');
      return;
    }

    voteMutation.mutate();
  };

  let disabled =
    (poll?.requireName && (!name || name.length < 3)) ||
    !checkedAnswers?.length;
  if (poll?.endDate)
    disabled = disabled || new Date(poll.endDate).getTime() < Date.now();

  return (
    <div className="mt-6">
      <div className="flex w-full gap-4">
        {results && (
          <div className="btn flex flex-1 select-none items-center justify-center gap-1 from-lime-500 to-green-600">
            <BiStation /> Live results
          </div>
        )}
        {!results && (
          <button
            className="btn flex flex-1 items-center justify-center"
            onClick={handleVote}
            disabled={disabled}
          >
            {voteMutation.isLoading ? <Spinner /> : 'Vote'}
          </button>
        )}

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
      </div>
    </div>
  );
};

export default Btns;
