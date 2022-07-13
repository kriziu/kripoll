import type { Poll } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export type PublicPoll = Omit<
  Poll,
  'answersVotes' | 'duplicationCheck' | 'votedIPs' | 'passwordToResults'
>;

export const usePoll = () => {
  const router = useRouter();

  const { id } = router.query;

  const { isError, isLoading, data, refetch } = useQuery(
    ['poll', id],
    async () => {
      const res = await axios.get<PublicPoll>(`/api/find?id=${id}`);
      return res.data;
    }
  );

  if (isError) router.push('/');

  return { isLoading, poll: data, refetch };
};
