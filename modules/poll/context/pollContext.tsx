import { createContext, ReactNode, useContext } from 'react';

import type { Poll } from '@prisma/client';

export type PublicPoll = Omit<
  Poll,
  'answersVotes' | 'duplicationCheck' | 'votedIPs' | 'passwordToResults'
>;

const pollContext = createContext<PublicPoll>({} as PublicPoll);

export const usePoll = () => {
  const poll = useContext(pollContext);

  return poll;
};

const PollProvider = ({
  children,
  poll,
}: {
  children: ReactNode;
  poll: PublicPoll;
}) => {
  return <pollContext.Provider value={poll}>{children}</pollContext.Provider>;
};

export default PollProvider;
