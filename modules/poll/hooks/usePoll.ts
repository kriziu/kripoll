import type { Poll } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

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
      const res = await axios.get<{ poll: PublicPoll; pinCode?: string }>(
        `/api/find?id=${id}`
      );
      return res.data;
    },
    { refetchInterval: 1000 * 30, enabled: !!id }
  );

  if (isError) router.push('/');

  return { ...data, isLoading, refetch };
};
